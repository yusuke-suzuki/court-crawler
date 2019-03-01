require('dotenv').config();
const Crawler = require('./crawler');

(async () => {
  const crawler = new Crawler;
  await crawler.start();
})();
