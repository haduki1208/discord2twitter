const Eris = require('eris');
const bot = new Eris(process.env.TOKEN);
const { CHANNEL_ID, USER_ID } = process.env;

bot.on('ready', () => {
  console.log('Eris Bot is Online.');
});

bot.on('messageCreate', msg => {
  // const content = msg.content.toLowerCase();
  if (msg.channel.id === CHANNEL_ID && msg.author.id === USER_ID) {
    msg.channel.createMessage('ういっす！');
  }
});

bot.connect().catch(err => {
  console.log(`Logging in error:\n${err}`);
});
