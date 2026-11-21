async page => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const assert=(condition,message)=>{if(!condition)throw new Error(message);};
  const switchTo=async language=>{
    await page.evaluate(value=>setTestLocale(value),language);
    await page.waitForFunction(value=>(document.querySelector('.bg_persistent')||document.querySelector('.bg_page'))?.lang===value,language);
  };
  let loads=0,searchFails=false,delayHome=false,releaseOld;
  const requests=[];
  await page.route('https://game.example.test/**',route=>{
    loads++;
    return route.fulfill({contentType:'text/html',body:'<!doctype html><button onclick="score++;document.querySelector(\'output\').textContent=score">score</button><output>0</output><script>window.score=0;window.docId=Math.random();</script>'});
  });
  await page.route('**/api/beegame/**',async route=>{
    const url=new URL(route.request().url());requests.push(url);
    if(searchFails&&url.searchParams.has('search'))return route.fulfill({status:503,json:{error:'offline'}});
    const lang=url.searchParams.get('locale');
    if(delayHome&&lang==='zh-CN'&&url.pathname.endsWith('/home')){
      delayHome=false;
      await new Promise(resolve=>releaseOld=resolve);
    }
    return route.fulfill({json:{games:[{id:'test',name:lang==='en'?'English Game':'中文游戏',url:'https://game.example.test/game',category:['Puzzle'],orientation:'landscape'}],updatedAt:Date.now()-150000,total:1}});
  });
  // Open the harness URL printed by server.cjs before running this scenario.
  await page.goto(new URL('/?lang=zh', page.url()).href);
  await page.getByRole('heading',{name:'beeGames',exact:true}).waitFor();
  assert(await page.evaluate(()=>slotSpecs['sidebar.panellist'].label())==='beeGames','Chinese sidebar name');
  await page.getByText('2 分钟前更新',{exact:true}).waitFor();
  await page.getByText('1 款游戏',{exact:true}).waitFor();
  await switchTo('en');
  await page.getByText('Updated 2 min ago',{exact:true}).waitFor();
  await page.getByText('1 game',{exact:true}).waitFor();
  await page.getByRole('button',{name:'English Game',exact:true}).first().waitFor();
  assert(await page.getByRole('heading',{name:'beeGames',exact:true}).count()===1,'English heading name');
  assert(await page.evaluate(()=>slotSpecs['sidebar.panellist'].label())==='beeGames','English sidebar name');
  await page.getByRole('searchbox',{name:'Search games',exact:true}).fill('game');
  await page.waitForResponse(response=>response.url().includes('search=game')&&response.url().includes('locale=en'));
  await switchTo('zh');
  await page.waitForResponse(response=>response.url().includes('search=game')&&response.url().includes('locale=zh-CN'));
  await page.getByRole('button',{name:'清空搜索',exact:true}).click();
  await Promise.all([page.waitForResponse(response=>response.url().includes('categories=Puzzle')),page.locator('.bg_chips').getByRole('button',{name:'解谜',exact:true}).click()]);
  await Promise.all([page.waitForResponse(response=>response.url().includes('categories=Puzzle')&&response.url().includes('locale=en')),switchTo('en')]);
  assert(await page.locator('.bg_chips').getByRole('button',{name:'Puzzle',exact:true}).getAttribute('aria-pressed')==='true','selected category lost');
  await page.locator('.bg_chips').getByRole('button',{name:'Discover',exact:true}).click();
  // A slow response from the old language must not replace the new catalog.
  delayHome=true;
  await switchTo('zh');
  await page.waitForFunction(()=>document.querySelector('.bg_page').lang==='zh');
  await page.waitForTimeout(60);
  assert(typeof releaseOld==='function','old home request was not held');
  await switchTo('en');
  await page.getByRole('button',{name:'English Game',exact:true}).first().waitFor();
  releaseOld();
  await page.waitForTimeout(80);
  assert(await page.getByRole('button',{name:'中文游戏',exact:true}).count()===0,'old language response replaced current catalog');
  // Translate errors at render time, including an already-visible error.
  searchFails=true;
  await page.getByRole('searchbox',{name:'Search games',exact:true}).fill('failure');
  await page.getByText('Could not load the catalog.',{exact:true}).first().waitFor();
  await switchTo('zh');
  await page.getByText('无法加载游戏目录。',{exact:true}).first().waitFor();
  assert(await page.getByText('Could not load the catalog.',{exact:true}).count()===0,'old language error still displayed');
  searchFails=false;
  await page.getByRole('button',{name:'清空搜索',exact:true}).click();
  await page.getByRole('button',{name:'中文游戏',exact:true}).first().click();
  await page.frameLocator('iframe').getByRole('button',{name:'score',exact:true}).click();
  const game=page.frames().find(frame=>frame.url().startsWith('https://game.example.test/'));
  const docId=await game.evaluate(()=>window.docId);
  await page.evaluate(()=>window.savedFrame=document.querySelector('iframe'));
  await switchTo('en');
  await page.getByRole('button',{name:'Restart',exact:true}).waitFor();
  await page.getByRole('button',{name:'DSH task updates',exact:true}).waitFor();
  assert((await page.locator('.bg_hud-pill').innerText()).includes('Done 1'),'HUD count template');
  await page.getByRole('button',{name:'Minimize (keep this game open)',exact:true}).click();
  await page.getByRole('button',{name:'Move game window · 中文游戏',exact:true}).waitFor();
  await page.getByRole('button',{name:'Resize game window (bottom-right corner)',exact:true}).waitFor();
  const grip=await page.locator('.bg_resize-handle[data-edge="se"]').boundingBox();
  await page.mouse.move(grip.x+5,grip.y+5);await page.mouse.down();
  await page.mouse.move(grip.x-95,grip.y+45,{steps:5});await page.mouse.up();
  const custom=await page.locator('.bg_persistent').boundingBox();
  await switchTo('zh');
  await page.getByRole('button',{name:'调整游戏小窗大小（右下角）',exact:true}).waitFor();
  const after=await page.locator('.bg_persistent').boundingBox();
  assert(custom.width===after.width&&custom.height===after.height,'locale switch changed custom size');
  await page.getByRole('button',{name:'暂离，去会话',exact:true}).click();
  await switchTo('en');
  await page.getByRole('button',{name:'Return to game',exact:true}).click();
  assert(loads===1,'language switch reloaded game');
  assert(await page.evaluate(()=>savedFrame===document.querySelector('iframe')&&savedFrame.isConnected),'game iframe replaced');
  assert(await game.evaluate(id=>score===1&&window.docId===id,docId),'game state lost');
  await page.getByRole('button',{name:'End game',exact:true}).click();
  await page.getByRole('button',{name:'Favorites',exact:true}).click();
  await page.getByText('No favorites yet. Tap the heart on any game to keep it here.',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Discover',exact:true}).first().click();
  await page.evaluate(()=>history.replaceState(null,'','/'));
  await page.reload();
  await page.getByRole('searchbox',{name:'Search games',exact:true}).waitFor();
  await page.screenshot({path:'output/playwright/i18n-en.png'});
  assert(errors.length===0,errors.join('\n'));
  return {result:'PASS',brandNames:true,zhEnLiveSwitch:true,memoizedCacheLabel:true,counts:true,searchLocale:true,categoryLocale:true,staleResponsesIgnored:true,errorsTranslated:true,playerHudAndResizeLabels:true,customSizeRetained:true,sameGameDocument:true,gameLoads:loads,hostPreferenceOnReload:true,pageErrors:errors};
}
