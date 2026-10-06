import {test,expect} from '@playwright/test';

test('desktop header docks to the top and navigation identifies the current section',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 const header=page.locator('.nav-shell');
 expect((await header.boundingBox())!.y).toBe(28);
 await page.locator('.desktop-nav').getByRole('link',{name:'Skills',exact:true}).click();
 await expect(page.locator('html')).toHaveClass(/header-scrolled/);
 expect((await header.boundingBox())!.y).toBe(0);
 await expect(page.locator('.desktop-nav').getByRole('link',{name:'Skills',exact:true})).toHaveAttribute('aria-current','location');
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await expect(page.locator('html')).not.toHaveClass(/header-scrolled/);
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>window.scrollTo({top:500,behavior:'instant'}));
 await expect(header).toHaveCSS('position','absolute');
});

test('updated content and project image links work across themes',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173');
 for(const width of [320,390,767,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ['dark','light']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 await expect(page.locator('.hero-description')).toContainText('I’m Nathanael, a software engineer based in Lusaka.');
 await expect(page.locator('.github-activity')).toHaveCount(0);
 await expect(page.locator('.badges-label')).not.toContainText('SAMPLE');
 await page.getByRole('button',{name:'Read Zamket case study'}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toContainText('recognised online home for handcrafts');
 await expect(dialog.getByRole('link',{name:'View full-size image'})).toHaveAttribute('href',/zamket\.png$/);
 await expect(dialog.getByRole('link',{name:'Source',exact:true})).toHaveAttribute('href',/^https:\/\/github.com\/Nate-zm/);
 await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Continue in email'})).toBeVisible();
 expect(errors).toEqual([]);
});

test('CV download starts immediately and view option opens the same PDF',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 const actions=page.locator('.hero-ctas');
 await actions.getByRole('button',{name:'More download options'}).click();
 await expect(page.getByRole('link',{name:'View CV',exact:true})).toHaveAttribute('href',/resume\.pdf\?v=/);
 await expect(page.getByRole('link',{name:'View CV',exact:true})).toHaveAttribute('target','_blank');
 await page.keyboard.press('Escape');
 const download=page.waitForEvent('download');
 await actions.getByRole('link',{name:'Download CV',exact:true}).click();
 await expect(actions.getByRole('link',{name:'Download started',exact:true})).toBeVisible();
 expect((await download).suggestedFilename()).toBe('Nathanael Nyirenda resume.pdf');
 await expect(page.locator('.build-status')).toHaveCount(0);
});
