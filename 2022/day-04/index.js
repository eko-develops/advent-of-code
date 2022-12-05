const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('section-pairs.txt', 'utf8');

	// [ [ pair, pair ], [ pair, pair ], ... ]
	const sectionPairs = parseData(data);

	//pt 1
	const amountContained = getTotalAmountContained(sectionPairs);
	console.log(`The total amount of sections overlapping is ${amountContained}`);

	//pt 2
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
