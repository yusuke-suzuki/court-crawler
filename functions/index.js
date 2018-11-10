const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
let page;

const getBrowserPage = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox'
    ]
  });
  return browser.newPage();
};

exports.courtCrawler = async (eventData, eventContext, callback) => {
  console.log(eventData);
  console.log(eventContext);
  console.log('Start crawling the page...');

  if (!page) {
    page = await getBrowserPage();
  }

  await page.emulate(devices['iPhone 6']);
  await page.goto(process.env.ENDPOINT);

  await page.waitForSelector('input[name=userId]')

  await page.goto(`${process.env.ENDPOINT}${process.env.AVAILABILITY_URL}`)
  await page.waitFor(2000)

  await page.goto(`${process.env.ENDPOINT}${process.env.ALL_WEATHER_TENNIS_COURT_URL}`)
  await page.waitFor(2000)

  console.log('Finish crawling.');
  callback();
};
