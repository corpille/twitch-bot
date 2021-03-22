const Answers = require('./answers');
const Checks = require('./checks');
const utils = require('../utils');
const config = require('../config');

const questionMapper = ['AreYouOk', 'Choice', 'FavoriteColor', 'GoodSituation'];
const affirmationMapper = ['Hello', 'Thanks'];

function findAnAnswer(msg, sender) {
  const msgIsAQuestion = isAQuestion(msg);
  let mapper = msgIsAQuestion ? questionMapper : affirmationMapper;
  msg = msg.replace('?', '').trim();

  const entry = mapper.find(name => Checks.checkByName(name, msg));
  let answer;
  if (!entry) {
    answer = msgIsAQuestion ? Answers.getDefaultAnswer() : Answers.getUnknownAnswer();
  } else {
    console.log(entry);
    answer = Answers.getHelloAnswer(entry, msg, sender);
  }
  return utils.capitalize(answer);
}

function isAQuestion(msg) {
  return msg.endsWith('?')
}

function executeCommand(msg) {
  return 
}

function messageHandler(msg, sender) {
  msg = msg.trim().toLowerCase();

  if (msg.indexOf(`@${config.BOT_USERNAME}`) !== -1) {
    const rawMsg = msg.replace(`@${config.BOT_USERNAME} `, '');
    return findAnAnswer(rawMsg, sender);
  } else if (msg.startsWith('!')) {
    return executeCommand(msg.substr(1, msg.length));
  }
  return undefined;
}

exports.findAnAnswer = findAnAnswer;
exports.executeCommand = executeCommand;
exports.messageHandler = messageHandler;