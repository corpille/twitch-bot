const BOT_USERNAME = 'picorebot'
const CHANNEL_NAME = 'enraggeur'
const OAUTH_TOKEN = 'oauth:1dgk5en2g2qumowdhscf4kij1ksbod';

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [
    CHANNEL_NAME
  ]
};

const algo = require('./algo/algo.js');

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

  // Remove whitespace from chat message
  msg = msg.trim().toLowerCase();

  if (msg.indexOf(`@${BOT_USERNAME}`) !== -1) {
    const sender = {
      name: context['display-name'],
      mod: context.mod
    };
    const rawMsg = msg.replace(`@${BOT_USERNAME} `, '');
    
    const answer = algo.findAnAnswer(rawMsg, sender);
    client.say(target, answer);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}