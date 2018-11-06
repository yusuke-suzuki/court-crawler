FROM node:8.9.4-slim

RUN mkdir /court-crawler
WORKDIR /court-crawler
ADD . /court-crawler

# Install latest chrome (dev) package.
# Note: this also installs the necessary libs so we don't need the previous RUN command.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' &&\
apt-get update &&\
apt-get install -y google-chrome-unstable

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install puppeteer
RUN yarn add puppeteer

RUN yarn

ENV ENDPOINT=https://yoyaku.sports.metro.tokyo.jp/sp
ENV AVAILABILITY_URL=/rsvPTransInstSrchPpsAction.do?displayNo=papab1000&conditionMode=1
ENV ALL_WEATHER_TENNIS_COURT_URL=/rsvPTransInstSrchBuildAction.do?displayNo=prpab2000&selectPpsPpsdCd=1000&selectPpsCd=1030

CMD ["google-chrome-unstable", "--no-sandbox", "--disable-setuid-sandbox"]

ENTRYPOINT tail -f /dev/null
