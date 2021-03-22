const translations = require('../assets/translations.json');

class Utils {
	getTranslation(key, params = {}) {
		const parts = key.split('.');
		let translation = translations;
		parts.forEach(part => {
			if (!translation || !translation[part]) {
				throw new Error('No translation found');
			}
			translation = translation[part];
		})
		Object.keys(params).forEach(key => translation = translation.replace(`$${key}`, params[key]));
		return translation;
	}

	hasKeyword(msg, keywords) {
		return new RegExp(keywords.join('|')).test(msg);
	}

	findFirsKeywordIndex(array, keywords) {
		const index = array.findIndex(item => {
				return keywords.some((keyword) => keyword.indexOf("'") === -1 ? keyword === item : item.startsWith(keyword))
			});
		if (index !== -1) {
			return array.slice(0, index).reduce((sum, item) => sum + item.length + 1, 0); 
		}
		return -1;
	}

	randFromArray(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	getGreetingTime(m) {
		if(!m || !m.isValid()) { return; } // if we can't find a valid or filled moment, we return.
		
		const split_afternoon = 12 //24hr time to split the afternoon
		const split_evening = 17 //24hr time to split the evening
		const currentHour = parseFloat(m.format("HH"));
		
		if(currentHour >= split_afternoon && currentHour <= split_evening) {
			return "afternoon";
		} else if(currentHour >= split_evening) {
			return "evening";
		} else {
			return "morning";
		}
	}

	capitalize(str) {
		return str[0].toUpperCase() + str.substr(1, str.length);
	}
}

module.exports = new Utils();
