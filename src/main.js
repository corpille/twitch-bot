const tmi = require('tmi.js');
const bot = require('./algo/bot.js');
const config = require('./config');

// Define configuration options
const opts = {
  identity: {
    username: config.BOT_USERNAME,
    password: config.OAUTH_TOKEN
  },
  channels: [
    config.CHANNEL_NAME
  ]
};


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const sender = {
    name: context['display-name'],
    mod: context.mod
  };
  const answer = bot.messageHandler(msg, sender)
  if (answer) {
    client.say(target, commandResult);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}