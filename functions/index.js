const Crawler = require('./crawler');
const crawler = new Crawler;

exports.courtCrawler = async (eventData, eventContext, callback) => {
  console.log(eventData);
  console.log(eventContext);

  await crawler.start();

  callback();
};
