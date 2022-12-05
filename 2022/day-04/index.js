const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('section-pairs.txt', 'utf8');

	// [ [ pair, pair ], [ pair, pair ], ... ]
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
		const [firstStarting, firstEnding] = first.split('-');
		const [secondStarting, secondEnding] = second.split('-');

		const firstPair = [];
		for (let i = parseInt(firstStarting); i <= parseInt(firstEnding); i++) {
			firstPair.push(parseInt(i));
		}

		const secondPair = [];
		for (let i = parseInt(secondStarting); i <= parseInt(secondEnding); i++) {
			secondPair.push(parseInt(i));
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
		const [firstStarting, firstEnding] = first.split('-');
		const [secondStarting, secondEnding] = second.split('-');

		if (
			(Number(firstStarting) <= Number(secondStarting) &&
				Number(firstEnding) >= Number(secondEnding)) ||
			(Number(secondStarting) <= Number(firstStarting) &&
				Number(secondEnding) >= Number(firstEnding))
		) {
			amountContained++;
		}
	});

	return amountContained;
};

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((section) => section.split(','));
};

main();
