import en from './lang/en.js';
import de from './lang/de.js';
import data from './data.js';

const render = () => {
	// Read the language from the local storage
	let language = localStorage.getItem('corostats.language');
	if (!language) {
		// When no language is set, use the one from the browser
		language = window.navigator.language.substring(0, 2);
	}

	// When hash is set update the location
	if (location.hash.length > 1) {
		language = location.hash.replace('#', '');
	}

	// Define the translations
	const translations = language === 'de' ? de : en;

	// Inject the global strings
	['title', 'timespan', 'intro', 'total_title', 'total_intro', 'age_title', 'age_intro', 'mortality_title', 'mortality_intro', 'footer']
		.forEach((key) => document.querySelector('.' + key.replace('_', '-')).innerHTML = translations[key]);

	// Read the data
	data(translations);
}

// Listen for language clicks
Array.from(document.querySelectorAll('.language__type')).forEach((lang) => lang.addEventListener('click', (e) => {
	e.stopPropagation();

	localStorage.setItem('corostats.language', e.target.getAttribute('href').replace('#', ''));
	render();

	return false;
}));

// Render initially
render();
