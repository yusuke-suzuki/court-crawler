const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.emulate(devices['iPhone 6']);
  await page.goto(process.env.ENDPOINT);

  await page.waitForSelector('input[name=userId]')

  /*
  await page.type('input[name=userId]', process.env.USER_ID)
  await page.waitForSelector('input[type=password]')
  await page.type('input[type=password]', process.env.USER_PASS)
  */

  await page.goto(`${process.env.ENDPOINT}${process.env.AVAILABILITY_URL}`)
  await page.waitFor(2000)

  await page.goto(`${process.env.ENDPOINT}${process.env.ALL_WEATHER_TENNIS_COURT_URL}`)
  await page.waitFor(2000)

  await browser.close();
})();
