const { getData } = require('../../scripts.js');

// condition - start of a packet is indicated by a sequence of four characters that are all different.
// find - identify the first position where the four most recently received characters were all different.
// answer - report the number of characters from the beginning of the buffer to the end of the first such four-character marker.

const main = () => {
	const data = getData('signals.txt', 'utf8');

	const chars = data.split('');

	console.log(chars);
};

main();
