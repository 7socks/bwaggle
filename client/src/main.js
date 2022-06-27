import $ from 'jquery';

import animate from './animation.js';

// $('#bee')
// $('#btn-play')
// $('#input-angle')
// $('#input-distance')

const startStopAnimation = function(e) {
  if (e.target.innerText === 'Play') {
    e.target.innerText = 'Stop';
  } else {
    e.target.innerText = 'Play';
  }
};

// Click events
$('#btn-play').on('click', startStopAnimation);
