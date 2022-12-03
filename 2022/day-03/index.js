const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('rucksacks.txt', 'utf8');
	const rucksacks = parseData(data);

	const commonItems = [];
	for (const rucksack of rucksacks) {
		const middle = rucksack.length / 2;
		const firstRucksack = rucksack.slice(0, middle);
		const secondRucksack = rucksack.slice(middle);

		for (let i = 0; i <= firstRucksack.length; i++) {
			if (secondRucksack.includes(firstRucksack[i])) {
				commonItems.push(convertCharCode(firstRucksack[i]));
				break;
			}
		}
	}

	const totalPriority = getTotalPriority(commonItems);
	console.log(`The sum of total priorities is ${totalPriority}`);
};

const parseData = (data) => {
	return data.toString().split(/\r?\n/);
};

const convertCharCode = (char) => {
	let difference = 96;

	if (char === char.toUpperCase()) {
		difference = 38;
	}

	return char.charCodeAt(0) - difference;
};

const getTotalPriority = (commonItems) => {
	return commonItems.reduce((total, current) => total + current, 0);
};

main();
