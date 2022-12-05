const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('section-pairs.txt', 'utf8');

	// [ [ pair, pair ], [ pair, pair ], ... ]
	const sectionPairs = parseData(data);

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

	console.log(`The total amount of sections overlapping is ${amountContained}`);
};

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((section) => section.split(','));
};

main();
