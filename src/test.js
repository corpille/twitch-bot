const readline = require('readline');
const algo = require('./algo/algo');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  line = line.trim().toLowerCase();
  console.log(algo.findAnAnswer(line, { username: 'nylwosh', name: 'Test user'}));
})