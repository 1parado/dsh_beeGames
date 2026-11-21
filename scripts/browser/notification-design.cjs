async page => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let loads = 0;
  await page.route('https://game.example.test/**', route => {
    loads++;
    return route.fulfill({ contentType: 'text/html', body: '<!doctype html><p>Game ready</p>' });
  });
  await page.goto(new URL('/?lang=zh', page.url()).href);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.evaluate(() => {
    for (const key of ['dsh-beegame-hud-position', 'dsh-beegame-window-position', 'dsh-beegame-window-size']) localStorage.removeItem(key);
  });
  await page.reload();
  await page.clock.install();
  await page.evaluate(() => setTestStatus([]));
  const openGame = async () => {
    await page.getByRole('button', { name: 'Keepalive Test', exact: true }).first().click();
    await page.frameLocator('iframe').getByText('Game ready').waitFor();
  };
  await openGame();
  await page.evaluate(() => {
    window.savedFrame = document.querySelector('iframe');
    const ids = ['a','b','c','d','e'];
    setTestTitles(Object.fromEntries([...ids.map(id => [id, { title: '完成 ' + id }]), ['ask', { title: '请批准部署' }]]));
    setTestStatus([...ids.map(id => [id, { completionUnread: true }]), ['ask', { pendingInteraction: { key: 'approval' } }]]);
  });
  await page.locator('.bg_hud-summary').waitFor();
  assert(await page.locator('.bg_hud-notices button').count() === 1, 'Storm was not collapsed');
  assert((await page.locator('.bg_hud-summary').innerText()).includes('5'), 'Wrong summary count');
  const warn = page.locator('.bg_hud-questions button').first();
  const warnBox = await warn.boundingBox(), summaryBox = await page.locator('.bg_hud-summary').boundingBox();
  assert(warnBox.y < summaryBox.y, 'Decision banner is below completed tasks');
  await page.locator('.bg_hud-summary').click();
  assert((await page.locator('.bg_hud-row').first().innerText()).includes('请批准部署'), 'Decision is not first in list');
  await page.getByRole('button', { name: '会话', exact: true }).click();
  await warn.waitFor({ state: 'visible' });
  await page.locator('.bg_hud-pill').waitFor({ state: 'visible' });
  await page.clock.runFor(65000);
  assert(await page.locator('.bg_hud-notices button').count() === 0, 'Completion summary did not expire');
  assert(await warn.isVisible(), 'Away decision banner expired');
  await page.screenshot({ path: 'output/playwright/away-notifications.png' });
  await page.getByRole('button', { name: '返回游戏', exact: true }).click();
  // Refusal preserves full mode and keeps the decision banner.
  await page.evaluate(() => { testOpenSessionMode = 'false'; });
  await warn.click();
  await page.locator('.bg_hud-error').waitFor();
  assert(await page.locator('.bg_persistent').getAttribute('data-mode') === 'full', 'Refusal left the game');
  await page.evaluate(() => { testOpenSessionMode = 'defer'; });
  await warn.click();
  await page.waitForFunction(() => typeof resolveTestOpen === 'function');
  assert(await page.locator('.bg_hud').getAttribute('aria-busy') === 'true', 'Pending navigation not exposed');
  assert(await warn.isDisabled(), 'Repeated navigation not blocked');
  await page.evaluate(() => resolveTestOpen());
  await page.waitForFunction(() => document.querySelector('.bg_persistent').dataset.mode === 'away');
  assert(await page.locator('.bg_hud-questions button').count() === 0, 'Opened decision banner stayed visible');
  assert(await page.evaluate(() => openedSessions.join(',')) === 'ask', 'Wrong or duplicate session opened');
  await page.getByRole('button', { name: '返回游戏', exact: true }).click();
  assert(await page.evaluate(() => savedFrame === document.querySelector('iframe') && savedFrame.isConnected), 'Navigation replaced iframe');
  assert(loads === 1, 'Navigation reloaded game');
  // Persist a HUD location and a resized/moved mini window across page reload.
  const pill = page.locator('.bg_hud-pill');
  await pill.press('ArrowLeft');
  await pill.press('ArrowDown');
  await page.getByRole('button', { name: '缩小到悬浮窗（保留当前游戏）', exact: true }).click();
  await page.locator('.bg_drag-handle').press('ArrowLeft');
  await page.locator('.bg_resize-handle[data-edge="se"]').press('ArrowLeft');
  await page.waitForTimeout(100);
  const saved = await page.evaluate(() => ({ hud: localStorage.getItem('dsh-beegame-hud-position'),
    window: localStorage.getItem('dsh-beegame-window-position'), size: localStorage.getItem('dsh-beegame-window-size') }));
  assert(saved.hud && saved.window && saved.size, 'Geometry was not saved');
  await page.reload();
  await openGame();
  await page.getByRole('button', { name: '缩小到悬浮窗（保留当前游戏）', exact: true }).click();
  await page.waitForTimeout(100);
  const restored = await page.evaluate(() => ({ hud: localStorage.getItem('dsh-beegame-hud-position'),
    window: localStorage.getItem('dsh-beegame-window-position'), size: localStorage.getItem('dsh-beegame-window-size') }));
  assert(restored.size === saved.size && restored.window === saved.window && restored.hud === saved.hud,
    'Geometry not restored: ' + JSON.stringify({ saved, restored }));
  await page.setViewportSize({ width: 480, height: 340 });
  await page.waitForTimeout(100);
  const rect = await page.locator('.bg_persistent').boundingBox();
  assert(rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= 480 && rect.y + rect.height <= 340, 'Restored window escaped viewport');
  assert(errors.length === 0, errors.join('\n'));
  return { result: 'PASS', awayNotifications: true, persistentDecision: true, priorityOrder: true,
    stormSummary: true, asyncNavigation: true, refusalKeepsGame: true, geometrySurvivesReload: true,
    clampedToSmallViewport: true, gameLoadedOnceBeforeReload: true, pageErrors: errors };
}
