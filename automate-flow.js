const puppeteer = require('puppeteer');

async function runQuestionnaire() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    console.log('🌐 Navigating to http://localhost:5174/');
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2' });
    await page.waitForTimeout(1000);

    // Step 1: Click on "Startup 招聘" scene
    console.log('📍 Clicking "Startup 招聘" scene...');
    await page.click('button:has-text("Startup 招聘")');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForTimeout(800);

    // Now we're in the flow - go through all 7 steps
    const steps = [
      { name: '行业选择 (Industry)', quick: 'ai' },           // Step 1: industry
      { name: '融资阶段 (Stage)', quick: 'mvp' },             // Step 2: stage
      { name: '招聘岗位 (Role)', quick: 'fe' },                // Step 3: role
      { name: '工作细节 (Work Detail)' },                      // Step 4: work-detail
      { name: '亮点介绍 (Highlights)' },                       // Step 5: highlights
      { name: '补充信息 (Supplement)' },                       // Step 6: supplement
      { name: '联系方式 (Contact)' },                          // Step 7: contact
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      console.log(`\n📝 Step ${i + 1}/7: ${step.name}`);

      // Wait for the question to be visible
      await page.waitForSelector('h2', { timeout: 5000 });
      const questionText = await page.$eval('h2', el => el.textContent);
      console.log(`   Question: ${questionText}`);

      // For steps with quick selection, click the first option
      if (step.quick) {
        console.log(`   Using quick selection: ${step.quick}`);
        // Click the first button option (usually first option)
        const buttons = await page.$$('button[class*="rounded-md"][class*="border"]');
        if (buttons.length > 0) {
          await buttons[0].click();
          await page.waitForTimeout(400);
        }
      } else {
        // For structured input fields, use quick text input
        const inputs = await page.$$('input[type="text"]');
        if (inputs.length > 0) {
          console.log(`   Found ${inputs.length} text inputs, filling with quick text...`);
          for (const input of inputs) {
            await input.type('Test', { delay: 50 });
            await page.waitForTimeout(100);
          }
        } else {
          // Try to find and click option buttons
          const buttons = await page.$$('button[class*="rounded-md"][class*="border"]');
          if (buttons.length > 0) {
            console.log(`   Clicking first option...`);
            await buttons[0].click();
            await page.waitForTimeout(400);
          }
        }
      }

      // Check if answer is registered
      await page.waitForTimeout(300);

      // Take a screenshot for reference
      const stepScreenshot = `step_${i + 1}_${step.name.replace(/ /g, '_').toLowerCase()}.png`;
      await page.screenshot({ path: stepScreenshot });
      console.log(`   Screenshot saved: ${stepScreenshot}`);

      // Click "下一步" (Next) button or "生成海报" (Generate Poster) if last step
      const nextButtonText = i === steps.length - 1 ? '生成海报' : '下一步';
      console.log(`   Clicking "${nextButtonText}" button...`);

      try {
        // Find and click the next/generate button
        const buttons = await page.$$eval('button', btns =>
          btns.map(btn => ({ text: btn.textContent, classes: btn.className }))
        );

        const nextBtn = await page.$(`button:not(:disabled)`);
        if (nextBtn) {
          const btnText = await page.evaluate(btn => btn.textContent, nextBtn);
          if (btnText.includes('下一步') || btnText.includes('生成海报')) {
            await nextBtn.click();
            console.log(`   ✓ Clicked "${btnText}"`);
          }
        }
      } catch (err) {
        console.log(`   Finding button by text pattern...`);
        // Fallback: click any enabled button in the bottom area
        const allButtons = await page.$$('button');
        for (const btn of allButtons) {
          const isDisabled = await page.evaluate(b => b.disabled, btn);
          if (!isDisabled) {
            await btn.click();
            break;
          }
        }
      }

      // Wait for next page to load
      if (i < steps.length - 1) {
        await page.waitForTimeout(600);
      }
    }

    // After last step, should be on preview/export page
    console.log('\n🎉 Questionnaire completed!');
    await page.waitForTimeout(2000);

    // Take final screenshot of preview page
    await page.screenshot({ path: 'final_preview_page.png' });
    console.log('📸 Final preview page screenshot saved: final_preview_page.png');

    // Check if we're on preview page
    try {
      const previewText = await page.$eval('body', el => el.textContent);
      if (previewText.includes('预览') || previewText.includes('导出') || previewText.includes('下载')) {
        console.log('✅ Successfully reached preview/export page!');
      }
    } catch (err) {
      console.log('Preview page check completed');
    }

    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      // Keep browser open for inspection
      console.log('\n💡 Browser will close in 10 seconds. You can inspect the preview page.');
      await new Promise(resolve => setTimeout(resolve, 10000));
      await browser.close();
    }
  }
}

runQuestionnaire();
