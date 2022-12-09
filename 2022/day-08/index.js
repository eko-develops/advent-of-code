// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.
// Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('grid.txt', 'utf8');
	const grid = getGrid(data);
	console.log(grid);
};

// [
//    [1, 2, 3, 4, 6],
//    [7, 8, 9, 1, 2],
//    [3, 4, 5, 6, 7]
// ]
//
const getGrid = (data) => {
	const parsedData = data
		.split(/\r?\n/)
		.map((row) => row.split('').map((cell) => Number(cell)))
		.slice(0, 3);

	return parsedData;
};

main();
