import * as PIXI from 'pixi.js';
import { Player } from './Player';

const app = new PIXI.Application({
	width       : 500, // default: 800
	height      : 700, // default: 600
	antialias   : true, // default: false
	transparent : false, // default: false
	resolution  : 1 // default: 1
});

// ------------------------------------------------------------------------
let objective = new PIXI.Graphics();
objective.beginFill(0x66ccff);
objective.drawRect(0, 0, 30, 30);
objective.endFill();
objective.x = 250;
app.stage.addChild(objective);

function createPlayer(number, direction, ratio) {
	let players = [];
	for (let i = 0; i < number; i++) {
		let circle;

		circle = new Player(direction, ratio);

		players.push(circle);

		app.stage.addChild(circle);
		app.renderer.backgroundColor = 0x061639;
		document.body.appendChild(app.view);
	}
	return players;
}

function getDistance(x1, y1, x2, y2) {
	let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	return distance;
}

// -----------------------------------------------------------------------

function deletePlayer(array) {
	let bestDistance = 90000;
	let bestPerfom = 100000;
	let best = null;
	let bestList = [];

	array.map((e) => {
		if (getDistance(e.x, e.y, objective.x, objective.y) < bestDistance) {
			bestDistance = getDistance(e.x, e.y, objective.x, objective.y);

			best = e;

			best.update(2);
			if (bestPerfom > e.directionPath.length) {
				bestPerfom = e.directionPath.length;
				best.update(1);
			}
		}

		if (e.gosu >= 4) {
			bestList.push(e);
		}
		app.stage.removeChild(e);
	});
	console.log(bestList);
	return best;
}

let players = createPlayer(25);
// ---------------------------------------------------------------------

function setup() {
	app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
	players.map((player) => {
		player.move();
		player.kill(app.view);
	});
	// check if every player is killed
	if (players.filter((e) => e.killed === false).length === 0) {
		let best = deletePlayer(players);
		console.log(best);
		players = createPlayer(25, best.directionPath);
	}
}
setup();
