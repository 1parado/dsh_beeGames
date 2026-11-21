async page => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let loads = 0;
  await page.route('https://game.example.test/**', route => {
    loads++;
    return route.fulfill({ contentType: 'text/html', body: '<!doctype html><p>Game ready</p><script>window.score=7</script>' });
  });
  await page.goto(new URL('/?lang=zh', page.url()).href);
  await page.clock.install();
  await page.getByRole('button', { name: 'Keepalive Test', exact: true }).first().click();
  await page.frameLocator('iframe').getByText('Game ready').waitFor();
  await page.evaluate(() => {
    window.savedFrame = document.querySelector('iframe');
    setTestTitles({ 'test-session': { title: '任务一' }, second: { title: '任务二' } });
    setTestStatus([['test-session', { completionUnread: true }], ['second', { completionUnread: true }]]);
  });
  const first = page.locator('.bg_hud-row[data-session-id="test-session"]');
  const second = page.locator('.bg_hud-row[data-session-id="second"]');
  const resume = () => page.getByRole('button', { name: /^(返回游戏|Return to game)$/ }).click();
  const openList = async () => {
    const pill = page.locator('.bg_hud-pill');
    await pill.waitFor({ state: 'visible' });
    if (await pill.getAttribute('aria-expanded') !== 'true') await pill.click();
  };
  const retained = async () => {
    assert(await page.evaluate(() => savedFrame === document.querySelector('iframe') && savedFrame.isConnected), 'Game iframe was replaced');
    assert(loads === 1, 'Game reloaded');
  };
  await page.locator('.bg_hud-notices [data-session-id="second"]').waitFor();
  await openList();
  await second.waitFor();
  await page.clock.runFor(65000);
  assert(await page.locator('.bg_hud-notices button').count() === 0, 'Top completion banners did not expire');
  assert(await first.count() === 1 && await second.count() === 1, 'Banner expiry cleared the persistent history');
  await page.getByRole('button', { name: '会话', exact: true }).click();
  await resume();
  await openList();
  for (const mode of ['none', 'both']) {
    await page.evaluate(value => setTestHooks(value), mode);
    await page.waitForTimeout(80);
    await openList();
    await first.waitFor();
    assert(await second.count() === 1, 'Hook adapter remount cleared pending completions');
    assert(await page.locator('.bg_hud-notices button').count() === 0, 'Hook remount replayed expired banners');
  }
  await page.getByRole('button', { name: '缩小到悬浮窗（保留当前游戏）', exact: true }).click();
  await first.waitFor({ state: 'visible' });
  await resume();
  // A refused navigation must keep the notice, including rejected promises.
  for (const mode of ['false', 'reject']) {
    await page.evaluate(value => { window.testOpenSessionMode = value; }, mode);
    await first.click();
    await page.locator('.bg_hud-error').waitFor();
    assert(await page.locator('.bg_persistent').getAttribute('data-mode') === 'full', 'Refused navigation left the game');
    await openList();
    assert(await first.count() === 1 && await second.count() === 1, 'Failed navigation cleared a completion');
  }
  await page.evaluate(() => { window.testOpenSessionMode = 'ok'; });
  // Opening the expanded row acknowledges just that task even if host unread lags.
  await openList();
  await page.locator('.bg_hud-row').filter({ hasText: '任务二' }).click();
  await resume();
  await openList();
  assert(await second.count() === 0 && await first.count() === 1, 'Click did not acknowledge exactly one task');
  await page.evaluate(() => setTestStatus([['test-session', { completionUnread: true }], ['second', { completionUnread: true, tokens: 10 }]]));
  await page.clock.runFor(100);
  assert(await second.count() === 0, 'Lagging host unread revived an acknowledged task');
  // Clearing all host flags leaves the unclicked task visible and counted.
  await page.evaluate(() => setTestStatus([]));
  await page.clock.runFor(65000);
  assert(await first.count() === 1, 'Host unread reset cleared an unclicked completion');
  assert((await page.locator('.bg_hud-pill').innerText()).includes('完成 1'), 'Pending completion count is wrong');
  await first.click();
  await resume();
  assert(await page.locator('.bg_hud').count() === 0, 'Acknowledged completions stayed in the HUD');
  await page.evaluate(() => setTestStatus([['test-session', { running: true }]]));
  await page.getByRole('button', { name: 'DSH 任务动态', exact: true }).waitFor();
  await page.evaluate(() => setTestStatus([['test-session', { completionUnread: true }]]));
  await openList();
  await first.waitFor();
  await page.evaluate(() => setTestLocale('en'));
  await page.getByText('Completed: 任务一', { exact: true }).waitFor();
  await retained();
  assert(await page.evaluate(() => openedSessions.join(',')) === 'second,test-session', 'Wrong tasks were opened');
  await first.click();
  await resume();
  // The persistent history remains scrollable after all banners expire.
  await page.evaluate(() => {
    setTestLocale('zh');
    const ids = Array.from({ length: 12 }, (_, index) => 'bulk-' + index);
    setTestTitles(Object.fromEntries(ids.map((id, index) => [id, { title: '已完成的任务 ' + (index + 1) }])));
    setTestStatus([...ids.map(id => [id, { completionUnread: true }]), ['question', { pendingInteraction: { key: 'ask' } }]]);
  });
  await page.locator('.bg_hud-flash[data-tone="warn"]').waitFor();
  await page.clock.runFor(9100);
  assert(await page.locator('.bg_hud-flash[data-tone="warn"]').count() === 1, 'Decision banner expired');
  assert(await page.locator('.bg_hud-notices button').count() === 0, 'Completion banners stayed visible');
  await openList();
  assert(await page.locator('.bg_hud-row[data-session-id^="bulk-"]').count() === 12, 'Banner timers cleared the completed task rows');
  await page.getByRole('button', { name: '缩小到悬浮窗（保留当前游戏）', exact: true }).click();
  await page.setViewportSize({ width: 480, height: 340 });
  await page.clock.runFor(200);
  const layout = await page.evaluate(() => {
    const root = document.querySelector('.bg_hud').getBoundingClientRect();
    const stage = document.querySelector('.bg_stage').getBoundingClientRect();
    const notices = document.querySelector('.bg_hud-list');
    return { bounded: root.top >= stage.top && root.bottom <= stage.bottom && root.left >= stage.left && root.right <= stage.right,
      scrollable: notices.scrollHeight > notices.clientHeight };
  });
  assert(layout.bounded && layout.scrollable, 'Completion stack escaped the game or cannot scroll');
  await page.getByRole('button', { name: 'DSH 任务动态', exact: true }).waitFor({ state: 'visible' });
  await page.screenshot({ path: 'output/playwright/completion-history.png' });
  await retained();
  assert(errors.length === 0, errors.join('\n'));
  return { result: 'PASS', bannerAutoExpires: true, persistentHistory: true, multipleTasks: true, clickAcknowledgesOne: true,
    hostUnreadResetRetained: true, noRevivalAfterClick: true, laterCompletionNotifies: true,
    failedNavigationRetained: true, hookRemountRetained: true, miniAndSessionRoundtrip: true,
    liveLocale: true, scrollableWithinSmallGame: true, decisionBannerPersistent: true,
    sameGameIframe: true, gameLoads: loads, pageErrors: errors };
}
