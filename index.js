'use strict';
import './style.css'

let x;

function jump() {
	console.log('jump')
}

// Main
document.addEventListener("DOMContentLoaded", function (event) {
	console.log('DOMload')

	document.addEventListener('keydown', (event) => {
		if (event.repeat)
			return false;
		
		if ([' ', 'Enter'].includes(event.key)) {
			jump();
		}
	});
});
