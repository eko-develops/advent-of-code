const { getData } = require('../../scripts.js');

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((calories) => parseInt(calories));
};

const main = () => {
	const data = getData('elf-calories.txt', 'utf8');
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

	const elvesCalorieSorted = elves.sort((a, b) => a - b);

	const highestCalorieElf = elvesCalorieSorted.at(-1);
	const totalTopCalorieElves = elvesCalorieSorted
		.slice(-3)
		.reduce((total, current) => (total += current));

	console.log(
		`The elf holding the most calories has ${highestCalorieElf} calories.`
	);

	console.log(`The 3 top elves calories total is ${totalTopCalorieElves}`);
};

main();
