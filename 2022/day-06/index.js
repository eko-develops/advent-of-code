const { getData } = require('../../scripts.js');

// condition - start of a packet is indicated by a sequence of four characters that are all different.
// find - identify the first position where the four most recently received characters were all different.
// answer - report the number of characters from the beginning of the buffer to the end of the first such four-character marker.

const main = () => {
	const data = getData('signals.txt', 'utf8');
	const chars = data.split('');
	console.log(chars);
	// const cache = [];
	// let answer = 0;
	// for (let i = 0; i < chars.length; i++) {
	// 	// console.log(cache);
	// 	if (cache.length === 4) {
	// 		if (chars[i + 1] === cache.at(-1)) {
	// 			// if the next value is same as last value in cache, continue
	// 			cache.shift(); //remove the value at the start. here we can think of it as we're moving down in groups of 4 for the cache
	// 			continue;
	// 		} else {
	// 			// we can say here that we may have found the signal
	// 			// we'll need to check here if whatever is in the cache is all different
	// 			if (!hasDuplicates(cache)) {
	// 				// if there are duplicates in the cache, we need to continue
	// 				cache.shift();
	// 				continue;
	// 			} else {
	// 				// if there are no duplicates, we know we got a signal
	// 				answer = i;
	// 				break;
	// 			}
	// 		}
	// 	} else {
	// 		cache.push(chars[i]);
	// 	}
	// }
	// console.log(answer);
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
			// key does not exist yet
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
