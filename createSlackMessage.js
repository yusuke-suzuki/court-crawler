const createSlackMessage = results => {
  const attachments = results.map(parkResult => {
    return createAttachment(parkResult);
  });

  const message = {
    text: `最新の空き情報を取得しました！\n[施設空き情報](${
      process.env.ENDPOINT
    })`,
    mrkdwn: true,
    attachments: attachments
  };
  return message;
};

const createAttachment = parkResult => {
  const fields = parkResult.results.map(dateResult => {
    return {
      title: dateResult.date,
      value: dateResult.results.join('\n')
    };
  });

  return {
    title: parkResult.parkName,
    fields: fields
  };
};

module.exports = createSlackMessage;
