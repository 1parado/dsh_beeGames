async page => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [], warnings = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='warning' && message.text().includes('[beeGames]')) warnings.push(message.text()); });
  let loads = 0;
  await page.route('https://game.example.test/**', route => {
    loads++;
    return route.fulfill({contentType:'text/html',body:'<!doctype html><button onclick="score++;document.querySelector(\'output\').textContent=score">score</button><output>0</output><script>window.score=0;window.docId=Math.random()</script>'});
  });
  await page.goto(new URL('/?lang=zh',page.url()).href);
  await page.clock.install();
  await page.getByRole('button',{name:'Keepalive Test',exact:true}).first().click();
  await page.frameLocator('iframe').getByRole('button',{name:'score',exact:true}).click();
  const frame=page.frames().find(frame=>frame.url().startsWith('https://game.example.test/'));
  const docId=await frame.evaluate(()=>window.docId);
  await page.evaluate(()=>window.savedFrame=document.querySelector('iframe'));
  await page.locator('.bg_hud-flash').waitFor();
  const initial=await page.evaluate(()=>hudRenders);
  assert(initial>0,'HUD instrumentation did not run');
  await page.evaluate(()=>{
    for(let i=0;i<50;i++)setTestStatus([['test-session',{completionUnread:true,tokenCount:i}],['quiet',{tokenCount:i}]]);
    setTestTitles({'test-session':{title:'测试任务',tokens:500},quiet:{title:'无关标题'}});
  });
  await page.waitForTimeout(80);
  const after=await page.evaluate(()=>hudRenders);
  assert(initial===after,`Irrelevant updates rendered HUD ${after-initial} times`);
  await page.clock.runFor(4000);
  await page.evaluate(()=>setTestTitles({'test-session':{title:'修改标题'}}));
  await page.getByText('已完成：修改标题',{exact:true}).waitFor();
  await page.clock.runFor(2100);
  assert(await page.locator('.bg_hud-flash').count()===0,'Completion banner did not expire after rename');
  await page.getByRole('button',{name:'DSH 任务动态',exact:true}).click();
  await page.locator('.bg_hud-row').filter({hasText:'修改标题'}).waitFor();
  assert((await page.locator('.bg_hud-pill').innerText()).includes('完成 1'),'Banner expiry cleared the completion count');
  for(const mode of ['status','none','titles','malformed','both']) {
    await page.evaluate(value=>setTestHooks(value),mode);
    await page.getByRole('button',{name:'DSH 任务动态',exact:true}).waitFor();
    await page.waitForFunction(()=>sessionSubscriptions().status===1&&sessionSubscriptions().titles===1);
    assert(await page.evaluate(()=>savedFrame===document.querySelector('iframe')&&savedFrame.isConnected),'Hook mode replaced iframe: '+mode);
    assert(await frame.evaluate(id=>score===1&&docId===id,docId),'Hook mode reset game: '+mode);
  }
  assert(warnings.length===1,`Expected one fallback diagnostic, got ${warnings.length}`);
  assert(loads===1,'Hook adapters reloaded game');
  await page.getByRole('button',{name:'结束游戏',exact:true}).click();
  await page.waitForFunction(()=>sessionSubscriptions().status===0&&sessionSubscriptions().titles===0);
  assert(errors.length===0,errors.join('\n'));
  return {result:'PASS',unrelatedUpdates:50,extraHudRenders:after-initial,bannerExpiresAfterRename:true,completionRowRetained:true,partialMissingAndMalformedHooks:true,oneFallbackWarning:true,subscriptionsDisposed:true,sameGameDocument:true,gameLoads:loads,pageErrors:errors};
}
