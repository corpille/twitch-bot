const readline = require('readline');
const bot = require('./algo/bot');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (msg) => {
  const sender = { username: 'nylwosh', name: 'Test user'};
  const answer = bot.messageHandler(msg, sender);
  if (answer) {
    console.log(answer);
  }
});