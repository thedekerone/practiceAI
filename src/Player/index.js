import * as PIXI from 'pixi.js';

export class Player extends PIXI.Graphics {
	constructor(direction = [], ratio) {
		super();
		this.velocity = 10;
		this.ratio = Math.PI / 4;
		this.gosu = 1;
		this.directionPath = [
			...direction
		];
		this.killed = false;
		this.iteration = 0;
		this.init();
	}
}
Player.prototype._direction_ = function() {
	const direction = Math.random() * Math.PI * 2 - Math.PI;
	const variation = Math.random() * this.ratio - this.ratio / 2;

	this.directionPath[this.iteration]
		? (this.directionPath[this.iteration] += variation)
		: (this.directionPath[this.iteration] = this.directionPath[this.iteration - 1] + variation || direction);
};

Player.prototype.kill = function(container) {
	if (
		this.x >= container.width - 2.5 ||
		this.x <= 0 + 2.5 ||
		this.y <= 0 + 0.25 ||
		this.y >= container.height - 2.5
	) {
		this.killed = true;
	}
};

Player.prototype.update = function(n) {
	this.gosu += n;
};

Player.prototype.move = function() {
	if (!this.killed) {
		this._direction_();
		this.y += this.velocity * Math.sin(this.directionPath[this.iteration]);

		this.x += this.velocity * Math.cos(this.directionPath[this.iteration]);
		this.iteration++;
	}
};

// ---------------------

Player.prototype.init = function() {
	this.beginFill(0x9966ff);
	this.drawCircle(0, 0, 5);
	this.endFill();
	this.x = 250;
	this.y = 600;
};
