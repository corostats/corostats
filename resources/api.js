/**
 * Returns the cumulated data.
 *
 * @returns array
 */
export function getData() {
	return fetch('assets/stats.json').then((resp) => resp.json());
}
export function getMortality() {
	return fetch('assets/mortality.json').then((resp) => resp.json());
}
