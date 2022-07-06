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

var beeLayer = new Konva.Layer();

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

beeLayer.add(bee);
stage.add(beeLayer);

var pathLayer = new Konva.Layer({
  visible: false
});

var wagglePoints = [];
var shift = 0;
var zigzag = true;
for (var i = dim.START_Y; i >= dim.END_Y; i -= (dim.START_Y - dim.END_Y) / 20) {
  wagglePoints = wagglePoints.concat([shift, i - (dim.END_Y + (dim.START_Y - dim.END_Y) / 2)]);

  zigzag ? shift -= 10 : shift += 10;
  if (shift === -10) {
    zigzag = false;
  } else if (shift === 10) {
    zigzag = true;
  }
}
var wagglePath = new Konva.Line({
  x: dim.MIDLINE,
  y: dim.END_Y + (dim.START_Y - dim.END_Y) / 2,
  points: wagglePoints,
  stroke: 'white',
  strokeWidth: 2,
  tension: 0.4,
  dash: [20, 5]
});

var leftArcPath = new Konva.Line({
  x: dim.MIDLINE,
  y: dim.END_Y + (dim.START_Y - dim.END_Y) / 2,
  points: [dim.OFFSET, dim.OFFSET - (dim.START_Y - dim.END_Y) / 2, dim.OFFSET - dim.RADIUS, 0, dim.OFFSET, (dim.START_Y - dim.END_Y) / 2 - dim.OFFSET],
  stroke: 'white',
  strokeWidth: 2,
  tension: 1,
  dash: [15, 10]
});

var rightArcPath = new Konva.Line({
  x: dim.MIDLINE,
  y: dim.END_Y + (dim.START_Y - dim.END_Y) / 2,
  points: [-1 * dim.OFFSET, dim.OFFSET - (dim.START_Y - dim.END_Y) / 2, dim.RADIUS - dim.OFFSET, 0, -1 * dim.OFFSET, (dim.START_Y - dim.END_Y) / 2 - dim.OFFSET],
  stroke: 'white',
  strokeWidth: 2,
  tension: 1,
  dash: [15, 10]
});

var pathGroup = new Konva.Group({
  x: dim.MIDLINE,
  y: dim.END_Y + (dim.START_Y - dim.END_Y) / 2,
  offset: {
    x: dim.MIDLINE,
    y: dim.END_Y + (dim.START_Y - dim.END_Y) / 2
  },
});
pathGroup.add(wagglePath, leftArcPath, rightArcPath);

pathLayer.add(pathGroup);
stage.add(pathLayer);
pathLayer.moveToBottom();

// Events
const startStopAnimation = function(e) {
  if (e.target.innerText === 'Play') {
    e.target.innerText = 'Stop';
    $('#btn-play').addClass('btn-stop');
    $('.input-params').prop('disabled', true);

    animate.create(params, beeLayer, bee);
    animate.reset();
    animate.play();
  } else {
    e.target.innerText = 'Play';
    $('#btn-play').removeClass('btn-stop');
    $('.input-params').prop('disabled', false);
    animate.stop();
  }
};

const showHidePath = function(e) {
  if (e.target.checked) {
    pathLayer.visible(true);
  } else {
    pathLayer.visible(false);
  }
};


$('#btn-play').on('click', startStopAnimation);
$('#opt-trace').on('change', showHidePath);

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

  pathGroup.rotation(params.angle);
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