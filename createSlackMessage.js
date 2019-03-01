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
};

module.exports = createSlackMessage;
