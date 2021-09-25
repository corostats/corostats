/**
 * Returns the cumulated data.
 *
 * @returns array
 */
export function getData() {
	return fetch('assets/data.json').then((resp) => resp.json());
}
