const utils = require('../utils');

exports.isHello = function (msg) {  
  const keywords = ['bonjour', 'bonsoir', 'hello', 'salut', 'hola', 'yo', 'yosh', 'wesh', 'heyo', 'heyou', 'hey'];
  return utils.hasKeyword(msg, keywords);
}

exports.isAreYouOk = function (msg) {
  const keywords = ['ça va', 'ca va', 'sa va'];
  return utils.hasKeyword(msg, keywords);
}

exports.isChoice = function (msg) {
  return msg.indexOf(' ou ') !==  -1;
}

exports.isFavoriteColor = function (msg) {
  const regexp = /couleur pr[eé]f[ée]r[ée]([re]?)/g;
  return regexp.test(msg);
}

exports.isGoodSituation = function (msg) {
  return msg.indexOf('une bonne situation') !==  -1
}