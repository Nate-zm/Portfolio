import { test, expect } from '@playwright/test';

test('mobile floating CV hides around both CV sections and returns between them',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 for(const width of [320,390,430,767]){
  await page.setViewportSize({width,height:844});
  const floating=page.locator('.floating-cv');
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await expect(floating).toHaveCount(0);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
  await page.locator('.resume-actions').scrollIntoViewIfNeeded();
  await expect(floating).toHaveCount(0);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
  await page.locator('.resume-actions').scrollIntoViewIfNeeded();
  await expect(floating).toHaveCount(0);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
 }
 await page.locator('.resume-actions').scrollIntoViewIfNeeded();
 await expect(page.locator('.floating-cv')).toHaveCount(0);
 await page.setViewportSize({width:1024,height:844});
 await expect(page.locator('.floating-cv')).toBeVisible();
 await page.setViewportSize({width:390,height:844});
 await page.locator('.resume-actions').scrollIntoViewIfNeeded();
 await expect(page.locator('.floating-cv')).toHaveCount(0);
});

test('contact popup downloads a vCard and keeps CV downloads as PDF',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 let downloads=0;
 page.on('download',()=>downloads++);
 for(const [area,width] of [['.hero-ctas',390],['.resume-actions',1440]] as const){
  await page.setViewportSize({width,height:900});
  const actions=page.locator(area);
  const before=downloads;
  await actions.getByRole('button',{name:'More download options'}).click();
  await page.getByRole('button',{name:'Save my contact',exact:true}).click();
  const dialog=page.getByRole('dialog');
  await expect(dialog).toContainText('Save my contact');
  await expect(dialog).toContainText('n8.vision.00@gmail.com');
  expect(downloads).toBe(before);
  const contactPromise=page.waitForEvent('download');
  await dialog.getByRole('link',{name:'Download contact (.vcf)'}).click();
  const contact=await contactPromise;
  expect(contact.suggestedFilename()).toBe('Nathanael Nyirenda.vcf');
  const {readFile}=await import('node:fs/promises');
  expect(await readFile((await contact.path())!)).toEqual(await readFile('public/assets/your-name.vcf'));
  await dialog.getByRole('button',{name:'Close dialog'}).click();
  await expect(dialog).toHaveCount(0);
  const pdfPromise=page.waitForEvent('download');
  await actions.getByRole('link',{name:'Download CV',exact:true}).click();
  const pdf=await pdfPromise;
  expect(pdf.suggestedFilename()).toBe('Nathanael Nyirenda resume.pdf');
  expect(await readFile((await pdf.path())!)).toEqual(await readFile('public/assets/Nathanael Nyirenda resume.pdf'));
 }
});

test('download menus and popups fit phones, tablets, and desktops',async({page})=>{
 test.setTimeout(120000);
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:5173');
 for(const [width,height] of [[320,568],[360,800],[390,844],[430,932],[844,390],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]){
  await page.setViewportSize({width,height});
  for(const theme of ['dark','light']){
   await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
   for(const area of ['.hero-ctas','.resume-actions','.floating-cv']){
    const actions=page.locator(area);
    if(area==='.floating-cv')await page.locator('footer').scrollIntoViewIfNeeded();
    await actions.getByRole('button',{name:'More download options'}).click();
    await page.getByRole('button',{name:'Save my contact',exact:true}).click();
    const dialog=page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const button=dialog.getByRole('link',{name:'Download contact (.vcf)'});
    await expect(button).toBeVisible();
    const bounds=await button.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width);
    await dialog.getByRole('button',{name:'Close dialog'}).click();
    await expect(dialog).toHaveCount(0);
    await actions.getByRole('button',{name:'More download options'}).click();
    await page.getByRole('button',{name:'Take it with you'}).click();
    await expect(dialog.locator('.qr svg')).toBeVisible();
    await dialog.getByRole('link',{name:'Download CV instead'}).scrollIntoViewIfNeeded();
    await expect(dialog.getByRole('link',{name:'Download CV instead'})).toHaveAttribute('href',/resume\.pdf\?v=/);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 expect(errors).toEqual([]);
});

test('hero greeting fits phones, tablets, and desktops in both themes',async({browser})=>{
 const devices=[
  {width:320,height:568,touch:true},{width:360,height:800,touch:true},
  {width:390,height:844,touch:true},{width:430,height:932,touch:true},
  {width:844,height:390,touch:true},{width:768,height:1024,touch:true},
  {width:1024,height:768,touch:true},{width:1280,height:800,touch:false},
  {width:1440,height:900,touch:false},{width:1920,height:1080,touch:false},
 ];
 for(const device of devices){
  const context=await browser.newContext({viewport:device,hasTouch:device.touch,reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:5173');
  await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['dark','light']){
   await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
   await expect(page.locator('.hero-intro')).toHaveText('HELLO WORLD, I’M NATHANAEL NYIRENDA');
   await expect(page.locator('.hero-present')).toHaveText('I present to you');
   const layout=await page.evaluate(()=>{
    const intro=document.querySelector('.hero-intro')!.getBoundingClientRect();
    const present=document.querySelector('.hero-present')!.getBoundingClientRect();
    const heading=document.querySelector('h1')!.getBoundingClientRect();
    const text=document.querySelector('.hero-intro > span')!.getBoundingClientRect();
    return {overflow:document.documentElement.scrollWidth>innerWidth,
     singleLine:intro.height<20,textFits:text.right<=intro.right+1,
     ordered:intro.bottom<=present.top&&present.bottom<=heading.top,
     colors:[...document.querySelectorAll('[class*=intro-code]')].map(el=>getComputedStyle(el).color)};
   });
   expect(layout.overflow,`${device.width}px ${theme}`).toBe(false);
   expect(layout.singleLine).toBe(true);
   expect(layout.textFits).toBe(true);
   expect(layout.ordered).toBe(true);
   expect(layout.colors[0]).not.toBe(layout.colors[1]);
  }
  if(device.width<768){
   await page.getByRole('button',{name:'Open navigation'}).click();
   await expect(page.getByRole('dialog')).toBeVisible();
   await page.getByRole('dialog').getByRole('link',{name:'Projects',exact:true}).click();
   await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
  await context.close();
 }
});
test('mobile connection notes use the full width with controls below',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 for(const width of [360,384,412,430]){
  await page.setViewportSize({width,height:900});
  const card=page.locator('.reference-card');
  await card.scrollIntoViewIfNeeded();
  const sizes=await card.evaluate(el=>{
   const card=el.getBoundingClientRect();
   const stage=el.querySelector('.reference-flip-stage')!.getBoundingClientRect();
   const controls=el.querySelector('.carousel-controls')!.getBoundingClientRect();
   return {cardWidth:card.width,stageWidth:stage.width,stageBottom:stage.bottom,controlsTop:controls.top};
  });
  expect(sizes.stageWidth/sizes.cardWidth).toBeGreaterThan(.8);
  expect(sizes.controlsTop).toBeGreaterThanOrEqual(sizes.stageBottom);
 }
 await page.getByRole('button',{name:'Next reference'}).click();
 await expect(page.locator('.reference-page:not(.reference-size-guide)')).toContainText('Your next collaboration');
 await expect(page.getByRole('button',{name:'Next reference'})).toHaveAttribute('aria-disabled','false');
 await page.getByRole('button',{name:'Previous reference'}).click();
 await expect(page.locator('.reference-page:not(.reference-size-guide)')).toContainText('Let’s start a conversation');
});
test('responsive layout, project filter, dialogs, theme, and downloads',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 await expect(page.getByRole('heading',{name:/Engineering/})).toBeVisible();
 for(const width of [360,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 await page.getByRole('button',{name:'Web',exact:true}).click();
 await expect(page.locator('.project-card')).toHaveCount(2);
 await page.getByRole('button',{name:'Read Zamket case study'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 const previousTheme=await page.locator('html').getAttribute('data-theme');const nextTheme=previousTheme==='dark'?'light':'dark';
 await page.keyboard.press('Control+k');await page.getByLabel('Search actions').fill('theme');
 await page.getByRole('button',{name:/Toggle theme/}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme',nextTheme);
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme',nextTheme);
 const downloadPromise=page.waitForEvent('download');await page.locator('.hero-ctas').getByRole('link',{name:'Download CV',exact:true}).click();
 const download=await downloadPromise;expect(download.suggestedFilename()).toContain('.pdf');expect(await download.failure()).toBeNull();
 await page.getByRole('button',{name:'Show CV QR code'}).click();await expect(page.getByRole('dialog')).toContainText('Take it with you');await expect(page.locator('.qr svg')).toBeVisible();
});
