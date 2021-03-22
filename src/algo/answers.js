const moment = require('moment-timezone');
const utils = require('../utils');
moment.locale('fr')

class Answers {
  defaultAnswers = [
    "yes",
    "no",
    "notSure",
    "maybe",
    "iThink",
    "iDontThink",
    "absolutely",
    "right",
    "definiltelyNot",
  ];

  getAnswer(name, msg, sender) {
    return this[`get${name}Answer`](sender, msg);
  }

  getDefaultAnswer() {
    return utils.getTranslation(`defaultAnswers.${utils.randFromArray(this.defaultAnswers)}`);
  }

  getUnknownAnswer() {
    return utils.getTranslation('unknownAnswer');
  }

  getHelloAnswer(sender) {
    const time = moment().tz('Europe/Paris');
    const greetingTime = utils.getGreetingTime(time);
    return utils.getTranslation(`hello.${greetingTime}`, {
      name: `@${sender.username}`
    });
  }

  getThanksAnswer(sender) {
    return utils.getTranslation(`thanks`, {
      name:  `@${sender.username}`
    });
  }

  getAreYouOkAnswer() {
    const date = moment();
    const expression = ['imothep', 'alright', 'nickel', 'likeA', 'toTheMax']
    return utils.getTranslation(`areYouOk.${utils.randFromArray(expression)}`, {
      day:  date.format('dddd')
    });
  }

  getChoiceAnswer(sender, msg) {
    const expression = ['moreLike', 'iPrefer', 'myChoice', 'obviously', 'forSure', 'ofCourse']
    const parts = msg.split(' ');
    const orIndex = parts.indexOf('ou');
    const choices = [msg.split(' ou ')[1]];
    const preposition = ['l\'', 'le', 'la', 'les', 'un', 'une', 'des'];
    const index = utils.findFirsKeywordIndex(parts, preposition);
    if (index !== -1) {
      choices.push(msg.slice(index, msg.indexOf(' ou ')).trim());
    } else {
      choices.push(parts[orIndex - 1]);
    }
    
    return utils.getTranslation(`choices.${utils.randFromArray(expression)}`, {
      answer: utils.randFromArray(choices)
    });
  }

  getFavoriteColorAnswer(sender, msg) {
    return  utils.getTranslation(`favoriteColor.${sender.username === 'nylwosh' ? 'nylwosh' : 'default'}`);
  }

  getGoodSituationAnswer(sender, msg) {
    return utils.getTranslation('GoodSituation');
  }

}


module.exports = new Answers();