const moment = require('moment-timezone');
const Utils = require('../utils');
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
    return Utils.getTranslation(`defaultAnswers.${Utils.randFromArray(this.defaultAnswers)}`);
  }

  getUnknownAnswer() {
    return Utils.getTranslation('unknownAnswer');
  }

  getHelloAnswer(sender) {
    const time = moment().tz('Europe/Paris');
    const greetingTime = Utils.getGreetingTime(time);
    return Utils.getTranslation(`hello.${greetingTime}`, {
      name: `@${sender.username}`
    });
  }

  getThanksAnswer(sender) {
    return Utils.getTranslation(`thanks`, {
      name:  `@${sender.username}`
    });
  }

  getAreYouOkAnswer() {
    const date = moment();
    const expression = ['imothep', 'alright', 'nickel', 'likeA', 'toTheMax']
    return Utils.getTranslation(`areYouOk.${Utils.randFromArray(expression)}`, {
      day:  date.format('dddd')
    });
  }

  getChoiceAnswer(sender, msg) {
    const expression = ['moreLike', 'iPrefer', 'myChoice', 'obviously', 'forSure', 'ofCourse']
    const parts = msg.split(' ');
    const orIndex = parts.indexOf('ou');
    const choices = [msg.split(' ou ')[1]];
    const preposition = ['l\'', 'le', 'la', 'les', 'un', 'une', 'des'];
    const index = Utils.findFirsKeywordIndex(parts, preposition);
    if (index !== -1) {
      choices.push(msg.slice(index, msg.indexOf(' ou ')).trim());
    } else {
      choices.push(parts[orIndex - 1]);
    }
    
    return Utils.getTranslation(`choices.${Utils.randFromArray(expression)}`, {
      answer: Utils.randFromArray(choices)
    });
  }

  getFavoriteColorAnswer(sender, msg) {
    return  Utils.getTranslation(`favoriteColor.${sender.username === 'nylwosh' ? 'nylwosh' : 'default'}`);
  }

  getGoodSituationAnswer(sender, msg) {
    return Utils.getTranslation('GoodSituation');
  }

}


module.exports = new Answers();