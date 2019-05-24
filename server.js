const Discord = require('discord.js');
const bot = new Discord.Client();
const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', async message => {
  const isTargetChannel = message.channel.id === process.env.CHANNEL_ID;
  const isTargetUser = message.author.id === process.env.USER_ID;
  let isTweet = false;

  const pureMessage = message.content
    .split(' ')
    .filter(line => {
      if (line === '!t' || line === '!tweet') {
        isTweet = true;
        return false;
      }
      return true;
    })
    .join(' ');

  if (isTargetChannel && isTargetUser && isTweet) {
    // const tweets = await readTweets('バンドリ');
    const status = await writeTweet(pureMessage).catch(error => {
      message.channel.send(error);
      throw error;
    });
  }
});

bot.login(process.env.DISCORD_TOKEN);

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
