const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('steps.txt', 'utf8');
	const [crates1, steps] = parseData(data);
	const [crates2] = parseData(data);

	const part1 = handleCrane(crates1, steps);
	console.log(`The crates on top after moving them is ${part1.join('')}`);

	const part2 = handleCrane(crates2, steps, true);
	console.log(`The crates on top after moving them is ${part2.join('')}`);
};

const handleCrane = (crates, steps, craneUpgrade = false) => {
	let stepsCounter = 0;
	while (stepsCounter < steps.length) {
		const currentStep = steps[stepsCounter];
		const { amount, from, to } = currentStep;

		const fromCrates = crates[from - 1]; // question givees index of crates by 1, we use 0
		const toCrates = crates[to - 1];

		const craneHold = []; // temporary hold for what the crane has

		for (let i = 0; i < amount; i++) {
			craneHold.push(fromCrates.pop());
		}

		if (craneUpgrade) {
			toCrates.push(...craneHold.reverse());
		} else {
			toCrates.push(...craneHold);
		}

		stepsCounter++;
	}

	const topCrates = [];
	crates.forEach((crate) => {
		topCrates.push(crate.at(-1));
	});
	return topCrates;
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
			.map((crate) => crate.match(/[A-Z]/g))
			.flat(); // unwrap crate in array

		parsedCrate.forEach((crate, i) => {
			if (structuredCrates[i] == undefined) {
				structuredCrates[i] = [crate];
			} else {
				structuredCrates[i].push(crate);
			}
		});
	}

	// [ [group], [group], ... ] - top of stack is end of array
	return structuredCrates.map(
		(groups) => groups.filter((crate) => crate !== null) // remove nulls
	);
};

main();
