const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('steps.txt', 'utf8');
	const [crates, steps] = parseData(data);

	let stepsCounter = 0;
	while (stepsCounter < steps.length) {
		const currentStep = steps[stepsCounter];
		const { amount, from, to } = currentStep;
		console.log({ amount, from, to });

		stepsCounter++;
	}
	// console.log(steps.slice(0, 3));
	// console.log(crates);
};

const parseData = (data) => {
	const result = data.toString().split(/\r?\n/);

	const seperatorIndex = result.indexOf('');

	const crates = result.slice(0, seperatorIndex - 1); // trim the numbering
	const parsedCrates = parseCrates(crates);

	const steps = result.slice(seperatorIndex + 1);

	const stepsObj = steps
		.map((step) => step.match(/\d{1,2}/g).map(Number))
		.map((steps) => ({ amount: steps[0], from: steps[1], to: steps[2] }));

	return [parsedCrates, stepsObj];
};

const parseCrates = (crates) => {
	const reversedCrates = crates.reverse();

	const structuredCrates = [];
	for (const currentCrate of reversedCrates) {
		const parsedCrate = currentCrate
			.match(/.{1,4}/g)
			.map((crate) => crate.match(/[A-Z]/g));

		parsedCrate.forEach((crate, i) => {
			if (structuredCrates[i] == undefined) {
				structuredCrates[i] = [crate];
			} else {
				structuredCrates[i].push(crate);
			}
		});
	}

	return structuredCrates;
};

main();
