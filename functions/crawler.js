const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
let page;

class Crawler {
  async start() {
    console.log('Start crawling the page...');

    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === 'development' ? false : true,
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox'
      ]
    });

    if (!page) {
      page = await browser.newPage();
    }

    await page.emulate(devices['iPhone 6']);
    await page.goto(process.env.ENDPOINT);

    await page.waitForSelector('input[name=userId]');

    await page.goto(`${process.env.ENDPOINT}${process.env.AVAILABILITY_URL}`);
    await page.waitFor(2000);

    await page.goto(`${process.env.ENDPOINT}${process.env.ALL_WEATHER_TENNIS_COURT_URL}`);
    await page.waitFor(2000);

    console.log('Finish crawling.');
    return browser.close();
  }
};

module.exports = Crawler;
