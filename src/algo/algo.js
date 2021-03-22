const answers = require('./answers');
const checks = require('./checks');
const utils = require('../utils');

const questionMapper = ['AreYouOk', 'Choice', 'FavoriteColor', 'GoodSituation'];
const affirmationMapper = ['Hello'];

const defaultAnswers = [
  'Oui',
  'Non',
  'Je ne suis pas sur',
  'Peut-être',
  'Je pense',
  'Je ne pense pas',
  'Absolument',
  'Tout à fait',
  'Définitivement pas',
];

function findAnAnswer(msg, sender) {
  const msgIsAQuestion = isAQuestion(msg);
  let mapper = msgIsAQuestion ? questionMapper : affirmationMapper;
  msg = msg.replace('?', '').trim();
  const entry = mapper.find(name => checks[`is${name}`](msg));
  let answer;
  if (!entry) {
    answer = msgIsAQuestion ? utils.randFromArray(defaultAnswers) : 'Désolé, je n\'ai pas compris';
  } else {
    answer = answers[`get${entry}Answer`](sender, msg);
  }
  return utils.capitalize(answer);
}

function isAQuestion(msg) {
  return msg.endsWith('?')
}

exports.findAnAnswer = findAnAnswer;