/**
 * First Column - What the opponent is going to play
 * Rock - A
 * Paper - B
 * Scissors - C
 *
 * Second Column - What you should play in response/outcome of the round
 * Rock - X
 * Paper - Y
 * Scissors - Z
 *
 * Lose - X
 * Draw - Y
 * Win - Z
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

const opponentMoves = {
	A: 'rock',
	B: 'paper',
	C: 'scissors',
};

const myMoves = {
	X: 'rock',
	Y: 'paper',
	Z: 'scissors',
};

const main = () => {
	const data = getData('rps-strategy.txt', 'utf8');

	// [ ['A', 'Y'], ['B', 'X'], ... ]
	const rounds = parseData(data);

	// part 1
	const totalPointsByRound = getTotalPointsByRound(rounds);

	//part 2
	const totalPointsByResult = getTotalPointsByResult(rounds);

	// answers
	console.log(
		`The total points from the first strategy will be ${totalPointsByRound}.`
	);
	console.log(
		`The total points from the second strategy will be ${totalPointsByResult}.`
	);
};

const parseData = (data) => {
	return data
		.toString()
		.split(/\r?\n/)
		.map((round) => round.split(' '));
};

const getRoundResult = (opponentPlay, myPlay) => {
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

const getTotalPointsByResult = (rounds) => {
	let totalPoints = 0;

	const endings = {
		X: 'lose',
		Y: 'draw',
		Z: 'win',
	};

	const determinedOutcomes = {
		// if we need to draw
		draw: {
			//and the opponent plays this
			A: 'X', //we play this
			B: 'Y',
			C: 'Z',
		},
		win: {
			A: 'Y',
			B: 'Z',
			C: 'X',
		},
		lose: {
			A: 'Z',
			B: 'X',
			C: 'Y',
		},
	};

	for (const round of rounds) {
		const [opponentPlay, roundResult] = round;
		const roundEndString = endings[roundResult]; // string version of outcome char in second column
		const myPlay = determinedOutcomes[roundEndString][opponentPlay]; // depends on the outcome given in second column and what opponent plays
		totalPoints += getPointsRoundResult(roundEndString); // adds points depending on round result
		totalPoints += getPointsForShape(myPlay); // adds points depending on my shape played

		// console.log({
		// 	weNeedTo: `${roundResult} - ${roundEndString}`,
		// 	opponentPlays: `${opponentPlay} - ${opponentMoves[opponentPlay]}`,
		// 	iShouldPlay: `${myPlay} - ${myMoves[myPlay]}`,
		// 	pointsAddedForRound: `${getPointsRoundResult(
		// 		roundEndString
		// 	)} points for ${roundEndString}ing`,
		// 	pointsAddedForShape: `${getPointsForShape(myPlay)} for playing ${
		// 		myMoves[myPlay]
		// 	}`,
		// 	totalPoints,
		// });
	}

	return totalPoints;
};

const getTotalPointsByRound = (rounds) => {
	let totalPoints = 0;

	for (const round of rounds) {
		const [opponentPlay, myPlay] = round;

		const roundResult = getRoundResult(opponentPlay, myPlay);

		// add the points depending on the result of the round
		totalPoints += getPointsRoundResult(roundResult);

		// add the points for the shape selected
		totalPoints += getPointsForShape(myPlay);
	}

	return totalPoints;
};

const getPointsRoundResult = (roundResult) => {
	const roundPoint = {
		win: 6,
		draw: 3,
		lose: 0,
	};

	if (roundResult === 'win') {
		return roundPoint.win;
	} else if (roundResult === 'draw') {
		return roundPoint.draw;
	} else {
		return roundPoint.lose;
	}
};

const getPointsForShape = (myPlay) => {
	const shapePoint = {
		X: 1,
		Y: 2,
		Z: 3,
	};

	return shapePoint[myPlay];
};

main();
