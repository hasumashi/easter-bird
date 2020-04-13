'use strict';
import './obstacle.css';

export default class Obstacle {
	constructor(gameElement, gapSize) {
		this.gameElement = gameElement;
		this.gapSize = gapSize;

		this.upper = null;
		this.lower = null;
		this._createObstable();

		this.onDestroy = new Promise((resolve, reject) => {
			this.upper.addEventListener('animationend', (event) => this._onElementDestroy(event));
			this.lower.addEventListener('animationend', (event) => {
				this._onElementDestroy(event);
				resolve(this);
			});
		})
	}

	_createObstable() {
		const upper = document.createElement('div');
		upper.className = 'obstacle upper';
		const lower = document.createElement('div');
		lower.className = 'obstacle lower';
	
		const gapPosition = Math.random() * 100; // %
		upper.style.height = `calc(${gapPosition}% - ${this.gapSize}px)`;
		lower.style.height = `calc(${100 - gapPosition}% - ${this.gapSize}px)`;
		
		this.gameElement.appendChild(upper);
		this.gameElement.appendChild(lower);
		this.upper = upper;
		this.lower = lower;
	}

	_onElementDestroy(event) {
		event.target.remove();
	}

	checkCollision(bird) {
		const birdBox = bird.domElement.getBoundingClientRect();
		const upperBox = this.upper.getBoundingClientRect();
		const lowerBox = this.lower.getBoundingClientRect();

		const collides = (a, b) => (
			((a.top + a.height) > (b.top)) &&
			(a.top < (b.top + b.height)) &&
			((a.left + a.width) > b.left) &&
			(a.left < (b.left + b.width))
		);

		return collides(birdBox, upperBox) || collides(bird, lowerBox);
	}
}
