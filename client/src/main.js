import $ from 'jquery';
import Konva from 'konva';

import animate from './animation.js';

// $('#bee')
// $('#btn-play')
// $('#input-angle')
// $('#input-distance')

// Dance parameters
const params = {
  angle: 0,
  distance: 200
};

// Static DOM Elements
$('#input-distance').prop({
  step: 200,
  min: 200,
  max: 5000,
});

$('#input-angle').prop({
  value: 0,
  min: 0,
  max: 359
});

// Animation elements
var stage = new Konva.Stage({
  container: 'dance-container',
  width: 600,
  height: 600
});

var layer = new Konva.Layer();

var imageObject = new Image();
imageObject.src = '/assets/honeybee.png';
var bee = new Konva.Image({
  image: imageObject,
  x: 300,
  y: 500,
  width: 101.38,
  height: 64
});

layer.add(bee);
stage.add(layer);

// Events
const startStopAnimation = function(e) {
  if (e.target.innerText === 'Play') {
    e.target.innerText = 'Stop';
    $('.input-params').prop('disabled', true);

    animate.create(params, layer, bee);
    animate.play();
  } else {
    e.target.innerText = 'Play';
    $('.input-params').prop('disabled', false);
    animate.stop(bee);
  }
};


$('#btn-play').on('click', startStopAnimation);

$('#input-angle').on('change', () => {
  let angle = $('#input-angle').prop('value');
  if (angle === '' || isNaN(Number(angle))) {
    $('#input-angle').prop('value', params.angle);
  } else {
    params.angle = $('#input-angle').prop('value');
  }
});

$('#input-distance').on('change', () => {
  params.distance = $('#input-distance').prop('value');
});