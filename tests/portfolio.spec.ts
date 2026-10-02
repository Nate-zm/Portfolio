import { test, expect } from '@playwright/test';
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
