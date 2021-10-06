import en from './lang/en.js';
import de from './lang/de.js';
import data from './data.js';
import mortality from './mortality.js';

// Listen for language clicks
window.addEventListener('hashchange', (e) => {
	let language = 'de';

	// When hash is set update the location
	if (location.hash.length > 1) {
		language = location.hash.replace('#', '');
	}

	// Set the actual language in the store
	localStorage.setItem('corostats.language', language);

	// Define the translations
	const translations = language === 'de' ? de : en;

	// Inject the global strings
	['title', 'timespan', 'intro', 'total_title', 'total_intro', 'age_title', 'age_intro', 'mortality_title', 'mortality_intro', 'footer']
		.forEach((key) => document.querySelector('.' + key.replace('_', '-')).innerHTML = translations[key]);

	// Set the title of the page
	document.querySelector('title').innerHTML = translations['title'];
	document.querySelector('meta[name="description"]').setAttribute('content', translations['intro']);


	// Set the language of the page
	document.querySelector('html').setAttribute('lang', language);

	// Read the data
	data(translations);
	mortality(translations);
});

if (location.hash.length <= 1) {
	// Get the last used language from the store
	let language = localStorage.getItem('corostats.language');
	if (!language) {
		// When no language is set, use the one from the browser
		language = window.navigator.language.substring(0, 2);
	}

	// Trigger the hash change
	location.hash = language;
} else {
	window.dispatchEvent(new Event('hashchange'));
}
