import $ from 'jquery';
import Konva from 'konva';

import animate from './animation.js';
import dim from './dimensions.js';

// Dance parameters
const params = {
  angle: 0,
  distance: 200
};

// Static DOM Elements
for (var i = 200; i <= 5000; i += 400) {
  $('#ticks').append($(`<option value="${i}"></option>`));
}

$('#input-distance').prop({
  step: 400,
  min: 200,
  max: 5000,
});

$('#input-angle').prop({
  value: 0,
  min: -10,
  max: 360,
  step: 10
});

// Animation elements
var stage = new Konva.Stage({
  container: 'dance-container',
  width: dim.CANVAS_WIDTH,
  height: dim.CANVAS_HEIGHT
});

var layer = new Konva.Layer();

var imageObject = new Image();
imageObject.src = '/assets/honeybee.png';
var bee = new Konva.Image({
  image: imageObject,
  x: dim.MIDLINE,
  y: dim.START_Y,
  width: dim.TARGET_WIDTH,
  height: dim.TARGET_HEIGHT,
  offset: {
    x: dim.TARGET_WIDTH / 2,
    y: dim.TARGET_HEIGHT / 2
  }
});

layer.add(bee);
stage.add(layer);

// Events
const startStopAnimation = function(e) {
  if (e.target.innerText === 'Play') {
    e.target.innerText = 'Stop';
    $('#btn-play').addClass('btn-stop');
    $('.input-params').prop('disabled', true);

    animate.create(params, layer, bee);
    animate.reset();
    animate.play();
  } else {
    e.target.innerText = 'Play';
    $('#btn-play').removeClass('btn-stop');
    $('.input-params').prop('disabled', false);
    animate.stop();
  }
};


$('#btn-play').on('click', startStopAnimation);

$('#input-angle').on('change', () => {
  let angle = $('#input-angle').prop('value');
  if (angle === '' || isNaN(Number(angle))) {
    $('#input-angle').prop('value', params.angle);
  } else {
    params.angle = Number(angle);
    $('#lbl-angle').css({
      transform: 'rotate('+ params.angle +'deg)'
    });
  }
});

$('#input-angle').on('input', (event) => {
  var angle = $('#input-angle').prop('value');
  if (angle < 0) {
    $('#input-angle').prop('value', 360 + Number(angle));
  } else if (angle >= 360) {
    $('#input-angle').prop('value', Number(angle) % 360);
  }
});

$('#input-distance').on('change', () => {
  params.distance = $('#input-distance').prop('value');
  $('#lbl-distance').text(params.distance + 'm');
});