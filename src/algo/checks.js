const utils = require('../utils');

class Checks {

  checkByName(name, msg) {
    return this[`is${name}`](msg);
  }
  
  isHello(msg) {  
    const keywords = ['bonjour', 'bonsoir', 'hello', 'salut', 'hola', 'yo', 'yosh', 'wesh', 'heyo', 'heyou', 'hey'];
    return utils.hasKeyword(msg, keywords);
  }

  isThanks(msg) {  
    const keywords = ['merci', 'thanks', 'thx'];
    return utils.hasKeyword(msg, keywords);
  }

  isAreYouOk(msg) {
    const keywords = ['ça va', 'ca va', 'sa va', 'va tu', 'vas tu', 'vas-tu', 'va-tu'];
    return utils.hasKeyword(msg, keywords);
  }

  isChoice(msg) {
    return msg.indexOf(' ou ') !==  -1;
  }

  isFavoriteColor (msg) {
    const regexp = /couleur pr[eé]f[ée]r[ée]([re]?)/g;
    return regexp.test(msg);
  }

  isGoodSituation (msg) {
    return msg.indexOf('une bonne situation') !==  -1
  }
}
module.exports = new Checks();
