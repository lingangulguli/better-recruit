const puppeteer = require('puppeteer');

async function navigate() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    
    // Step 1: Click Startup
    await page.click('button:has-text("Startup 招聘")');
    await page.waitForNavigation();
    
    // Step 1: Select AI
    await page.click('button:has-text("AI / 大模型")');
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    // Step 2: Select MVP
    await page.click('button:has-text("MVP / Demo")');
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    // Step 3: Select roles (multi-choice)
    await page.click('button:has-text("后端工程师")');
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    // Step 4: Work details (skip or fill)
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    // Step 5: Highlights
    await page.click('button:has-text("快速成长")');
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    // Step 6: Supplement (skip)
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    // Step 7: Contact
    await page.click('button:has-text("下一步")');
    await page.waitForNavigation();
    
    console.log('✅ Reached preview page');
    await page.screenshot({ path: 'preview-page.png' });
    
    // Wait for user inspection
    await new Promise(r => setTimeout(r, 5000));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

navigate();
