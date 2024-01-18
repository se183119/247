const Eris = require("eris");
const keep_alive = require('./keep_alive.js')

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

// Join a voice-channel
bot.on("messageCreate", (msg) => {
  if (msg.content === "!join") {
    const voiceChannel = msg.member.voiceState.channelID;

    if (voiceChannel) {
      bot.joinVoiceChannel(voiceChannel).then((connection) => {
        console.log(`Bot joined ${voiceChannel}`);
      }).catch((error) => {
        console.error(error);
      });
    } else {
      msg.channel.createMessage("You need to be in a voice channel to use this command.");
    }
  }
});

bot.connect(); // Get the bot to connect to Discord
