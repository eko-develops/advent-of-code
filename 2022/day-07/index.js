const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('commands.txt', 'utf8');
	// const commands = data.toString().split(/\r?\n/).slice(0, 100);
	const commands = data.toString().split(/\r?\n/);

	// console.log(commands);
	getTotalDirSum(commands);
};

const getTotalDirSum = (commands) => {
	let total = 0;

	commands.forEach((command) => {
		const number = command.match(/\d/g);
		console.log(number);
		if (number !== null) {
			const parsedNumber = parseInt(number.join(''));
			const limit = 100000;
			if (parsedNumber <= limit) {
				total += parsedNumber;
			}
		}
	});
	console.log(total);

	// console.log(result);
};

/**
 *
 * @param {string} string
 * @returns string|false
 */
const isCommand = (string) => {
	if (string.startsWith('$')) {
		const command = string.split(' ')[1];

		return command;
	} else {
		return false;
	}
};

main();
