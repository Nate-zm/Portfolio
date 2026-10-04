import { test, expect } from '@playwright/test';

test('phone ripple starts at the tap, covers the row, and cleans up',async({page})=>{
 await page.goto('http://127.0.0.1:5173');
 const phone=page.locator('.phone-contact').first();
 await phone.scrollIntoViewIfNeeded();
 await expect.poll(()=>phone.evaluate(element=>getComputedStyle(element.parentElement!.parentElement!).transform)).toBe('none');
 const bounds=(await phone.boundingBox())!;
 await page.mouse.move(bounds.x+24,bounds.y+30);
 await page.mouse.down();
 const wave=phone.locator('.phone-ripple');
 await expect(wave).toHaveCount(1);
 const geometry=await wave.evaluate(element=>{
  const style=(element as HTMLElement).style;
  return {x:parseFloat(style.left)+parseFloat(style.width)/2,y:parseFloat(style.top)+parseFloat(style.height)/2,size:parseFloat(style.width)};
 });
 expect(geometry.x).toBeCloseTo(24,0);
 expect(geometry.y).toBeCloseTo(30,0);
 expect(geometry.size/2).toBeGreaterThanOrEqual(Math.hypot(bounds.width-24,bounds.height-30)-1);
 await expect(phone).toHaveAttribute('href','tel:+79874226650');
 // Release outside the link so verification does not launch a phone app.
 await page.mouse.move(bounds.x+bounds.width+20,bounds.y);
 await page.mouse.up();
 await expect(wave).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.mouse.move(bounds.x+24,bounds.y+30);
 await page.mouse.down();
 await expect(wave).toHaveCount(0);
 await page.mouse.move(bounds.x+bounds.width+20,bounds.y);
 await page.mouse.up();
});
