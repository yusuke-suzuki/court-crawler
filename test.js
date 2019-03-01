require('dotenv').config();
const crawler = require('./crawler');

(async () => {
  await crawler();
})();
