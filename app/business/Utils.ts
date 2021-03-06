import moment = require("moment");
import {Conf} from "../config/Config";
import {IntlPolyfill} from "../framework/polyfills/IntlPolyfill";
import {AgendaEntry, Lesson} from "../model/Lesson";


const possibleChars = ['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?_-'];

// Apply polyfills
const Intl = window.Intl = window.Intl || IntlPolyfill;

export class Utils {
	// static uuid():string {
	// 	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	// 		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	// 		return v.toString(16);
	// 	});
	// }

	static browserLang:string = navigator.language.split('-')[0];

	static now = moment();

	// Internationalization API
	// NumberFormat: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/NumberFormat
	static formatCurrency(price:number):string {
		return Intl.NumberFormat(<any>Conf.lang, {
			style: 'currency',
			currency: Conf.currency,
			currencyDisplay: 'symbol'
		}).format(price)
			.replace('CNY', 'RMB') // CNY is the output in fr, but not the most common symbol. RMB is more natural.
			;
	}

	// http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
	// n is mainly intended to be a string, but it should work with any type.
	static isNumeric(n:any) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	static randomPassword():string {
		let password = '';
		for (let i = 0; i < 16; i += 1) {
			password += possibleChars[Math.floor(Math.random() * possibleChars.length)];
		}
		return password;
	}

	static toLesson(entry:AgendaEntry):Lesson {
		return {
			$key: entry.$key,
			studentId: entry.studentId,
			price: entry.price,
			date: entry.date,
			duration: entry.duration,
			repetition: entry.repetition,
			repetitionEnd: entry.repetitionEnd,
			cancellations: entry.cancellations,
		};
	}
	
	static truncateDatetime(datetime:string):string {
		return datetime.substr(0, 16);
	}
	static truncateDate(date:string):string {
		return date.substr(0, 10);
	}

	static entryCancelled(entry:AgendaEntry):boolean {
		return Array.isArray(entry.cancellations) && !!entry.cancellations.find((cancellation:string) => {
			return moment(cancellation).isSame(entry.start);
		});
	}
}
