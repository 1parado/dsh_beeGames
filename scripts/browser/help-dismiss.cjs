async page => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.clock.install();
  let loads=0;
  await page.route('https://game.example.test/**',async route=>{
    loads++;
    await route.fulfill({contentType:'text/html',body:'<!doctype html><meta charset="utf-8"><p>Game ready</p><script>window.score=7</script>'});
  });
  const assert=(condition,message)=>{if(!condition)throw new Error(message);};
  const open=async()=>{
    await page.getByRole('button',{name:'Keepalive Test',exact:true}).first().click();
    await page.frameLocator('iframe').getByText('Game ready').waitFor();
    await page.clock.runFor(16100);
  };
  // Open the harness URL printed by server.cjs before running this scenario.
  await page.goto(new URL('/', page.url()).href);
  await open();
  await page.locator('.bg_help').waitFor();
  await page.evaluate(()=>{window.originalFrame=document.querySelector('iframe');});
  await page.getByRole('button',{name:'关闭并不再提示',exact:true}).click();
  assert(await page.locator('.bg_help').count()===0,'dismiss did not hide help');
  assert(await page.evaluate(()=>document.querySelector('iframe')===originalFrame&&originalFrame.isConnected),'dismiss replaced the game frame');
  assert(loads===1,'dismiss reloaded the game');
  assert(await page.evaluate(()=>localStorage.getItem('dsh-beegame-help-hidden'))==='1','dismiss was not persisted');
  await page.getByRole('button',{name:'重开',exact:true}).click();
  await page.frameLocator('iframe').getByText('Game ready').waitFor();
  await page.clock.runFor(16100);
  assert(await page.locator('.bg_help').count()===0,'restart showed dismissed help');
  await page.getByRole('button',{name:'结束游戏',exact:true}).click();
  await open();
  assert(await page.locator('.bg_help').count()===0,'new player showed dismissed help');
  await page.reload();
  await open();
  assert(await page.locator('.bg_help').count()===0,'app reload forgot dismissal');
  assert(errors.length===0,errors.join(', '));
  return {result:'PASS',closeButton:true,dismissPreservesGame:true,hiddenAfterRestart:true,hiddenAfterPlayerRemount:true,hiddenAfterAppReload:true,pageErrors:errors};
}
