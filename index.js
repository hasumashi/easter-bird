'use strict';
import './style.css'

const GRTAVITY = 0.33;
const JUMP_VELOCITY = 6;
const HEIGHT = 640;

const _bird = {
	domElement: null,
	velocity: 0,
	position: 0,
};

const _animation = {
	handler: null,
	lastTimestamp: 0,
};


function jump() {
	console.log('jump')
	_bird.velocity = -JUMP_VELOCITY
}

function animate(timestamp) {	
	const timeDelta = timestamp - _animation.lastTimestamp;
	const moveFactor = (timeDelta / 16); // requestanimationframe defaults to 60 FPS (16ms)

	console.log(timeDelta);
	_bird.position += _bird.velocity * moveFactor;
	_bird.velocity += GRTAVITY;
	_bird.domElement.style.transform = `translateY(${_bird.position}px)`;
	console.log(_bird)

	_animation.lastTimestamp = timestamp;
	if (_bird.position <= HEIGHT)
		_animation.handler = requestAnimationFrame(animate);
}

// Main
document.addEventListener("DOMContentLoaded", function (event) {
	_bird.domElement = document.getElementById('bird');
	console.log('DOMload', _bird)

	document.addEventListener('keydown', (event) => {
		if (event.repeat)
			return false;
		
		if ([' ', 'Enter'].includes(event.key)) {
			jump();
		}
	});

	_animation.handler = requestAnimationFrame(animate);
});
