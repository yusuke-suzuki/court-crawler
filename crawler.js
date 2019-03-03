const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
let page;

const parks = [
  '日比谷公園',
  '浮間公園',
  '東綾瀬公園',
  '光が丘公園',
  '石神井公園Ｂ',
  '井の頭恩賜公園'
];

const crawler = async () => {
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

  const results = [];

  for (let parkName of parks) {
    const result = await getParkData(parkName);
    if (result.results.length > 0) {
      results.push(result);
    }
  }

  console.log('Finish crawling.');
  await browser.close();

  return results;
};

const getParkData = async parkName => {
  await (await page.$x('//div[text()="施設空き状況"]'))[0].click();
  await page.waitFor(1000);

  await (await page.$x('//div[text()="テニス（人工芝）"]'))[0].click();
  await page.waitFor(1000);

  while (true) {
    const targetPark = (await page.$x(`//div[text()="${parkName}"]`))[0];
    if (targetPark) {
      await targetPark.click();
      await page.waitFor(1000);
      break;
    } else {
      await (await page.$x('//span[text()="次へ"]'))[0].click();
      await page.waitFor(1000);
    }
  }

  const date = new Date();
  date.setDate(date.getDate() + 2);
  console.log(`Search ${parkName}...`);

  await page.select('select[name=selectYear]', date.getFullYear().toString());
  await page.select(
    'select[name=selectMonth]',
    (date.getMonth() + 1).toString()
  );
  await page.select(
    'select[name=selectDay]',
    date
      .getDate()
      .toString()
      .padStart(2, 0)
  );
  await page.waitFor(1000);

  await page.click('input[name=srchSelectWeek][id=sat]');
  await page.click('input[name=srchSelectWeek][id=sun]');
  await page.click('input[name=srchSelectWeek][id=hol]');
  await page.waitFor(1000);

  await page.click('input[type=submit]');
  await page.waitFor(1000);

  const results = [];

  while (true) {
    let outOfTerm = (await page.$x('//span[text()="空き情報"]'))[0] === null;
    if (outOfTerm) {
      break;
    }

    const dayData = await getDayData();
    if (dayData.results.length > 0) {
      results.push(dayData);
    }

    let nextPageButton = (await page.$x('//span[text()="翌日"]'))[0];
    if (nextPageButton) {
      await nextPageButton.click();
      await page.waitFor(1000);
    } else {
      break;
    }
  }

  await (await page.$x('//span[text()="TOP画面へ"]'))[0].click();
  await page.waitFor(1000);

  return {
    parkName: parkName,
    results: results
  };
};

const getDayData = async () => {
  const today = await page.evaluate(() => {
    let lists = document.querySelectorAll('ul.ui-listview');
    return lists[0].lastChild.innerText;
  });

  const dayData = await page.evaluate(() => {
    let results = [];

    const nodeList = document.querySelectorAll('span.ff-monospace');
    nodeList.forEach(node => {
      if (node.innerText !== '×') {
        results.push(node.parentNode.innerText);
      }
    });

    return results;
  });

  return {
    date: today,
    results: dayData
  };
};

module.exports = crawler;
