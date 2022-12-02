const fs = require('fs');
const path = require('path');

const readFile = () => {
	const data = fs.readFileSync('2022/day-01/input.txt', 'utf8');
	const result = data.split('\n');
	return result;
};

console.log(readFile());
