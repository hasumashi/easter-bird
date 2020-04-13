'use strict';
import './style.css'

import Obstacle from './obstacle';

const GRTAVITY = 0.33;
const JUMP_VELOCITY = 6;

const HEIGHT = 640;
const GAP_SIZE = 100;
const OBSTACLE_DELAY = 3000;

const _bird = {
	gameElement: null,
	domElement: null,
	velocity: 0,
	position: 0,

	_over: false,
	get over() { return this._over; },
	set over(value) {
		if (value) {
			clearInterval(_animation.obstacleInterval);
			this.gameElement.classList.add('end');
		}
		
		this._over = value;
	},
	
	_score: 0,
	get score() { return this._score },
	set score(x) {
		document.querySelector('#score > span').textContent = x;
		this._score = x;
	}
};

let _obstacles = [];

const _animation = {
	handler: null,
	lastTimestamp: 0,
	obstacleInterval: null,
};


function jump() {
	if (!_bird.over) {
		_bird.velocity = -JUMP_VELOCITY;
	}
}

function animate(timestamp) {	
	const timeDelta = timestamp - _animation.lastTimestamp;
	const moveFactor = (timeDelta / 16); // requestanimationframe is 60 FPS (16ms)

	// movement
	_bird.position += _bird.velocity * moveFactor;
	_bird.velocity += GRTAVITY;
	_bird.domElement.style.transform = `translateY(${_bird.position}px)`;

	// collision
	const collides = _obstacles.some(obstacle => obstacle.checkCollision(_bird));
	if (collides) {
		_bird.over = true;
	}
	
	if (_bird.position > HEIGHT) {
		_bird.over = true;
		return false;
	}

	_animation.lastTimestamp = timestamp;
	_animation.handler = requestAnimationFrame(animate);
}

function createObstacle() {
	const obstacle = new Obstacle(_bird.gameElement, GAP_SIZE);
	_obstacles.push(obstacle);
	obstacle.onDestroy.then(() => {
		console.log('remove')
		_obstacles = _obstacles.filter(o => o !== obstacle);
	});
	console.log(_obstacles)

}


// Main
document.addEventListener("DOMContentLoaded", function (event) {
	_bird.gameElement = document.getElementById('game');
	_bird.domElement = document.getElementById('bird');
	console.log('DOMload', _bird)

	_animation.obstacleInterval = setInterval(() => {
		createObstacle();
	}, OBSTACLE_DELAY);

	setTimeout(() => {
		setInterval(() => {
			if (!_bird.over)
				_bird.score += 1;
		}, OBSTACLE_DELAY)
	}, OBSTACLE_DELAY / 2);

	document.addEventListener('keydown', (event) => {
		if (event.repeat)
			return false;
		
		if ([' ', 'Enter'].includes(event.key)) {
			jump();
		}
	});

	_animation.handler = requestAnimationFrame(animate);
});
