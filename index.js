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

};

const _animation = {
	handler: null,
	lastTimestamp: 0,
};

const _obstacles = [];


function jump() {
	_bird.velocity = -JUMP_VELOCITY;
}

function animate(timestamp) {	
	const timeDelta = timestamp - _animation.lastTimestamp;
	const moveFactor = (timeDelta / 16); // requestanimationframe is 60 FPS (16ms)

	_bird.position += _bird.velocity * moveFactor;
	_bird.velocity += GRTAVITY;
	_bird.domElement.style.transform = `translateY(${_bird.position}px)`;

	_animation.lastTimestamp = timestamp;
	if (_bird.position <= HEIGHT)
		_animation.handler = requestAnimationFrame(animate);
}

function createObstacle() {
	const obstacle = new Obstacle(_bird.gameElement, GAP_SIZE);
	_obstacles.push(obstacle);
	obstacle.onDestroy.then(() => {
		_obstacles.filter(o => o !== obstacle);
	});
}


// Main
document.addEventListener("DOMContentLoaded", function (event) {
	_bird.gameElement = document.getElementById('game');
	_bird.domElement = document.getElementById('bird');
	console.log('DOMload', _bird)

	const obstacleInterval = setInterval(() => {
		createObstacle();
	}, OBSTACLE_DELAY);

	document.addEventListener('keydown', (event) => {
		if (event.repeat)
			return false;
		
		if ([' ', 'Enter'].includes(event.key)) {
			jump();
		}
	});

	_animation.handler = requestAnimationFrame(animate);
});
