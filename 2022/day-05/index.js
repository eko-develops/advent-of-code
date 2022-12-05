const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('steps.txt', 'utf8');
	const [crates, steps] = parseData(data);

	// console.log(steps.slice(0, 3));
	// console.log(crates);
};

const parseData = (data) => {
	const result = data.toString().split(/\r?\n/);

	const seperatorIndex = result.indexOf('');

	const crates = result.slice(0, seperatorIndex);
	const parsedCrates = parseCrates(crates);

	const steps = result.slice(seperatorIndex + 1);

	const stepsObj = steps
		.map((step) => step.match(/\d{1,2}/g).map(Number))
		.map((steps) => ({ amount: steps[0], from: steps[1], to: steps[2] }));

	return [crates, stepsObj];
};

const parseCrates = (crates) => {
	const reversedCrates = crates.reverse();

	const structuredCrates = [];
	for (let i = 1; i < crates.length; i++) {
		const currentCrate = reversedCrates[i];
		// .map((crate) => crate.match(/[A-Z]/g));
		// .flat();
		console.log(currentCrate);
	}
	// console.log(reversedCrates);
};

main();
