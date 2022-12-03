const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('rucksacks.txt', 'utf8');
	console.log(data);
};

main();
