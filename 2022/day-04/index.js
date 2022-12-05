const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('section-pairs.txt', 'utf8');

	const sectionPairs = parseData(data);

	//pt 1
	const amountContained = getTotalAmountContained(sectionPairs);
	console.log(`The total amount of sections contained is ${amountContained}`);

	//pt 2
	const amountOverlapping = getTotalOverlapping(sectionPairs);
	console.log(
		`The total amount of sections overlapping is ${amountOverlapping}`
	);
};

const getTotalOverlapping = (sectionPairs) => {
	let totalOverlapping = 0;

	sectionPairs.forEach(([first, second]) => {
		const [firstSection, secondSection] = parseSections(first, second);
		const [firstStarting, firstEnding] = firstSection;
		const [secondStarting, secondEnding] = secondSection;

		const firstPair = [];
		for (let i = firstStarting; i <= firstEnding; i++) {
			firstPair.push(i);
		}

		const secondPair = [];
		for (let i = secondStarting; i <= secondEnding; i++) {
			secondPair.push(i);
		}

		for (const number of firstPair) {
			if (secondPair.includes(number)) {
				totalOverlapping++;
				break;
			}
		}
	});

	return totalOverlapping;
};

const getTotalAmountContained = (sectionPairs) => {
	let amountContained = 0;

	sectionPairs.forEach(([first, second]) => {
		const [firstSection, secondSection] = parseSections(first, second);
		const [firstStarting, firstEnding] = firstSection;
		const [secondStarting, secondEnding] = secondSection;

		if (
			(firstStarting <= secondStarting && firstEnding >= secondEnding) ||
			(secondStarting <= firstStarting && secondEnding >= firstEnding)
		) {
			amountContained++;
		}
	});

	return amountContained;
};

const parseSections = (...sections) => {
	return sections.map((section) =>
		section.split('-').map((number) => parseInt(number))
	);
};

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((section) => section.split(','));
};

main();
