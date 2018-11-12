const Crawler = require('./crawler');
const crawler = new Crawler;

const { IncomingWebhook } = require('@slack/client');
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

const createSlackMessage = () => {
  let message = {
    text: `最新の空き情報を取得しました！`,
    mrkdwn: true,
    attachments: [
      {
        title: `公園別空き情報一覧`,
        title_link: process.env.ENDPOINT,
        fields: [
          {
            title: `ほげほげ公園`,
            value: `:ok:`
          },
          {
            title: `ほげほげ海岸公園`,
            value: `:ok:`
          }
        ]
      }
    ]
  };
  return message;
}

exports.courtCrawler = async (eventData, eventContext, callback) => {
  console.log(eventData);
  console.log(eventContext);

  await crawler.start();

  webhook.send(createSlackMessage(), (err, res) => {
    if (err) {
      console.log('Failed to send message to slack: ', err);
    } else {
      console.log('Message sent to slack: ', res);
    }
  });

  callback();
};
