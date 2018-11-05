module.exports = async function (context, crawlerTimer) {
  var timeStamp = new Date().toISOString();

  if (crawlerTimer.isPastDue) {
    context.log('JavaScript is running late!');
  }
  context.log('JavaScript timer trigger function ran!', timeStamp);
};
