/**
 * First Column - What the opponent is going to play
 * Rock - A
 * Paper - B
 * Scissors - C
 *
 * Second Column - What you should play in response
 * Rock - X
 * Paper - Y
 * Scissors - Z
 *
 * Calculating Points
 * Rock - 1
 * Paper - 2
 * Scissors - 3
 *
 * Lose - 0
 * Draw - 3
 * Win - 6
 */

const { getData } = require('../../scripts.js');

const main = () => {
	const data = getData('../../data/rps-strategy.txt', 'utf8');

	// [ ['A', 'Y'], ['B', 'X'], ... ]
	const rounds = parseData(data);

	const roundPoint = {
		win: 6,
		draw: 3,
		lose: 0,
	};

	const movePoint = {
		X: 1,
		Y: 2,
		Z: 3,
	};

	let totalPoints = 0;

	for (const round of rounds) {
		const [opponentPlay, myPlay] = round;

		const roundResult = checkRound(opponentPlay, myPlay);

		if (roundResult === 'win') {
			totalPoints += roundPoint.win;
		} else if (roundResult === 'draw') {
			totalPoints += roundPoint.draw;
		} else {
			totalPoints += roundPoint.lose;
		}

		// add the point for the shape selected
		totalPoints += movePoint[myPlay];
	}

	console.log(`The total points from the strategy will be ${totalPoints}.`);
};

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((round) => round.split(' '));
};

const checkRound = (opponentPlay, myPlay) => {
	// if my move is this, play that
	const winningMoves = {
		X: 'C',
		Y: 'A',
		Z: 'B',
	};

	const drawMoves = {
		X: 'A',
		Y: 'B',
		Z: 'C',
	};

	if (winningMoves[myPlay] === opponentPlay) {
		// we win
		return 'win';
	} else if (drawMoves[myPlay] === opponentPlay) {
		// draw
		return 'draw';
	} else {
		// we can assume we lost
		return 'lose';
	}
};

main();
