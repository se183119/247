const Eris = require("eris");
const keep_alive = require('./keep_alive.js')

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.on("ready", () => {
  console.log("Bot is online and ready!");
});

// Check permission
const permissions = bot.getVoiceChannel(voiceChannel).permissionsOf(bot.user.id);

if (!permissions.has("voiceConnect") || !permissions.has("voiceSpeak")) {
  console.log("Bot doesn't have the required permissions to join or speak in the voice channel.");
  return;
}

// Check user in a voice-channel
const voiceChannel = msg.member.voiceState.channelID;

if (!voiceChannel) {
  msg.channel.createMessage("You need to be in a voice channel to use this command.");
  return;
}

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
