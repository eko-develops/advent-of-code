const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('commands.txt', 'utf8');
	const commands = data.toString().split(/\r?\n/).slice(0, 3);
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
