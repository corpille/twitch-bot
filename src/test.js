const readline = require('readline');
const algo = require('./algo/algo');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const BOT_USERNAME = 'plop';

rl.on('line', function(line){
  line = line.trim().toLowerCase();
  console.log(onMessageHandler({ username: 'nylwosh', name: 'Test user'}, line));
})

function onMessageHandler (sender, msg) {
  // Remove whitespace from chat message
  msg = msg.trim().toLowerCase();

  if (msg.indexOf(`@${BOT_USERNAME}`) !== -1) {
    const rawMsg = msg.replace(`@${BOT_USERNAME} `, '');
    
    return algo.findAnAnswer(rawMsg, sender);
  }
}