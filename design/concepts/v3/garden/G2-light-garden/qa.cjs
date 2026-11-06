// Preview QA: PLAYWRIGHT_PATH may point to an existing Playwright package.
// Screenshots and machine results are written to the OS temporary directory.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
(async()=>{
  const out=path.join(os.tmpdir(),'g2-light-garden-qa');fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const url=pathToFileURL(path.join(__dirname,'index.html')).href;
  const report={screens:[],errors:[],performance:{}};
  for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:width===390?844:1000},deviceScaleFactor:1,hasTouch:width===390});
    const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
    const cdp=await context.newCDPSession(page);if(width===390)await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
    await page.goto(url);await page.waitForTimeout(1200);
    for(const id of ['home','tutors','subjects','lessons','reviews','contact']){
      await page.evaluate(id=>{document.documentElement.style.scrollBehavior='auto';const el=document.getElementById(id);window.scrollTo(0,id==='home'?0:el.getBoundingClientRect().top+scrollY-24);},id);
      await page.waitForTimeout(900);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width} ${id}`);
      const file=path.join(out,`${width}-${id}.png`);await page.screenshot({path:file});report.screens.push(file);
    }
    const diag=await page.evaluate(()=>gardenDiagnostics());
    const percentile=(a,p)=>a.sort((x,y)=>x-y)[Math.min(a.length-1,Math.floor(a.length*p))]||0;
    report.performance[width]={grid:diag.cells,cols:diag.cols,rows:diag.rows,stepP95:percentile(diag.stepMs,.95),drawP95:percentile(diag.drawMs,.95),stepMax:Math.max(...diag.stepMs),drawMax:Math.max(...diag.drawMs),species:diag.species};
    await page.locator('#pause').click();const g=await page.evaluate(()=>gardenDiagnostics().generation);await page.waitForTimeout(1100);assert.equal(await page.evaluate(()=>gardenDiagnostics().generation),g,'pause');
    await page.locator('#species').click();await page.locator('#plant').click();assert.equal(await page.evaluate(()=>gardenDiagnostics().planted),1,'keyboard planting');
    await page.locator('#subjects .choose').nth(1).click();assert.equal(await page.evaluate(()=>gardenDiagnostics().selected),2,'subject choice');
    await page.locator('.eugene .card-front .flip').click();assert.equal(await page.locator('.tutor.eugene').evaluate(e=>e.classList.contains('is-back')),true,'flip back');
    await page.screenshot({path:path.join(out,`${width}-flip.png`)});
    await page.locator('.eugene .card-back .flip').click();assert.equal(await page.locator('.tutor.eugene').evaluate(e=>e.classList.contains('is-back')),false,'flip front');
    await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0);});
    await page.mouse.click(width-8,130);assert.equal(await page.evaluate(()=>gardenDiagnostics().planted),2,'empty-space planting');
    await page.locator('#pause').click();await page.locator('.barney .card-front .flip').click();await page.waitForTimeout(1100);assert.equal(await page.locator('.barney').evaluate(e=>e.classList.contains('is-back')),true,'animated flip');
    assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex');
    assert.equal(await page.locator('a.button[href="#contact"]').count()>0,true);
    await context.close();
  }
  const small=await browser.newPage({viewport:{width:320,height:740}});await small.goto(url);assert.equal(await small.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'320px overflow');await small.screenshot({path:path.join(out,'320-home.png')});
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(url);await reduced.waitForTimeout(1100);assert.equal(await reduced.evaluate(()=>gardenDiagnostics().generation),0,'reduced motion');await reduced.locator('.barney .card-front .flip').click();assert.equal(await reduced.locator('.barney').evaluate(e=>e.classList.contains('is-back')),true,'reduced instant flip');
  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});await nojs.goto(url);assert.equal(await nojs.locator('#eugene-back').isVisible(),true,'no JS full content');assert.equal(await nojs.locator('a[href="mailto:ebarneytutoring@gmail.com"]').count()>0,true);
  await browser.close();assert.deepEqual(report.errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
})();
