require('dotenv').config();
const crawler = require('./crawler');
const createSlackMessage = require('./createSlackMessage');

(async () => {
  try {
    const results = await crawler();
    console.log(results);

    const message = createSlackMessage(results);
    console.log(message);
  } catch (e) {
    console.log(e);
  }
})();
