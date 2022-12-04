const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('rucksacks.txt', 'utf8');
	const rucksacks = parseData(data);

	// part 1
	const commonItems = getCommonItemsPriority(rucksacks);
	const totalPriority = getTotalPriority(commonItems);
	console.log(`The sum of total priorities is ${totalPriority}`);

	//part2
	// [ [1, 2, 3], [4, 5, 6],  ...]
	const groups = getGroups(rucksacks);

	const groupBadgesCodes = getGroupBadgeCodes(groups);
	const groupPriorityTotals = getTotalPriority(groupBadgesCodes);
	console.log(
		`The sum of total priorites for badges is ${groupPriorityTotals}`
	);
};

const getGroupBadgeCodes = (groups) => {
	const badges = [];

	for (let i = 0; i < groups.length; i++) {
		const currentGroup = groups[i];
		for (let j = 0; j < currentGroup.length; j++) {
			const first = currentGroup[j];

			for (let k = 0; k < first.length; k++) {
				const currentChar = first[k];
				if (
					currentGroup[j + 1].includes(currentChar) &&
					currentGroup[j + 2].includes(currentChar)
				) {
					badges.push(convertCharCode(currentChar));
					break;
				}
			}
			break;
		}
	}

	return badges;
};

const getGroups = (rucksacks) => {
	const groups = [];
	const groupSize = 3;
	for (let i = 0; i < rucksacks.length; i += groupSize) {
		const group = rucksacks.slice(i, i + groupSize);
		groups.push(group);
	}
	return groups;
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

const getCommonItemsPriority = (rucksacks) => {
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

	return commonItems;
};

const getTotalPriority = (commonItems) => {
	return commonItems.reduce((total, current) => total + current, 0);
};

main();
