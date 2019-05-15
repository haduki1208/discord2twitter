const Eris = require('eris');
const bot = new Eris(process.env.TOKEN);
const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const { CHANNEL_ID, USER_ID } = process.env;

bot.on('ready', () => {
  console.log('Eris Bot is Online.');
});

bot.on('messageCreate', async msg => {
  const content = msg.content.toLowerCase();
  const isTargetChannel = msg.channel.id === CHANNEL_ID;
  const isTargetUser = msg.author.id === USER_ID;
  const hadCmdOption = /-t\s+/.test(content);

  if (isTargetChannel && isTargetUser && hadCmdOption) {
    // const tweets = await readTweets('五等分の花嫁');
    // const status = await writeTweet();
    msg.channel.createMessage('書き込み');
  }
});

const readTweets = screen_name =>
  new Promise((resolve, reject) => {
    const params = { screen_name };
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (error) {
        reject(error);
      }
      resolve({
        tweets,
        response
      });
    });
  });

const writeTweet = status =>
  new Promise((resolve, reject) => {
    const params = { status };
    client.post('statuses/update', params, (error, tweet, response) => {
      if (error) {
        reject(error);
      }
      resolve({
        tweet,
        response
      });
    });
  });

bot.connect().catch(err => {
  console.log(`Logging in error:\n${err}`);
});
