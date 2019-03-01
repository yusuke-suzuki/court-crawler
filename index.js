const { IncomingWebhook } = require('@slack/client');
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

const crawler = require('./crawler');
const createSlackMessage = require('./createSlackMessage');

exports.courtCrawler = async (eventData, eventContext, callback) => {
  console.log(eventData);
  console.log(eventContext);

  await crawler();

  webhook.send(createSlackMessage(), (err, res) => {
    if (err) {
      console.log('Failed to send message to slack: ', err);
    } else {
      console.log('Message sent to slack: ', res);
    }
  });

  callback();
};
