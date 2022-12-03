const { getData } = require('../../scripts.js');

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((calories) => parseInt(calories));
};

const main = () => {
	const data = getData('../../data/elf-calories.txt', 'utf8');
	const result = parseData(data);

	const elves = [];

	let total = 0;

	for (let calorie of result) {
		if (!isNaN(calorie)) {
			total += calorie;
		} else {
			elves.push(total);
			total = 0;
		}
	}

	const highestCalorieElf = elves.sort((a, b) => a - b).at(-1);

	console.log(
		`The elf holding the most calories has ${highestCalorieElf} calories.`
	);
};

main();
