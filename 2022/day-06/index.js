const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('signals.txt', 'utf8');
	const chars = data.split('');

	const shortSignal = findStartofPacketMarker(chars);
	const longSignal = findStartofPacketMarker(chars, true);

	console.log(shortSignal);
	console.log(longSignal);
};

const findStartofPacketMarker = (chars, long = false) => {
	const cache = [];

	let signalLimit = 4;

	if (long) {
		signalLimit = 14;
	}

	for (let i = 0; i < chars.length; i++) {
		if (cache.length < signalLimit) {
			cache.push(chars[i]);
		} else {
			if (hasDuplicates(cache)) {
				cache.shift();
				cache.push(chars[i]);
			} else {
				if (cache.at(-1) === chars[i + 1]) {
					cache.unshift();
					cache.push(chars[i]);
				} else {
					return i;
				}
			}
		}
	}
};

/**
 *
 * @param {[string]} array Array of chars. Size of 4.
 * @returns Boolean
 */
const hasDuplicates = (array) => {
	const map = {};

	let index = 0;
	for (let char of array) {
		if (map[char] === undefined) {
			map[char] = 1;
		} else {
			map[char]++;
		}
		index++;
	}

	for (let char in map) {
		if (map[char] > 1) {
			return true;
		}
	}

	return false;
};

main();
