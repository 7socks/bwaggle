import $ from 'jquery';
import Konva from 'konva';

import animate from './animation.js';
import dim from './dimensions.js';

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

//test
var line1 = new Konva.Line({
  points: [300-101.38, 0, 300-101.38, 600],
  stroke: 'blue',
  strokewidth: 1
});

var line2 = new Konva.Line({
  points: [300+101.38, 0, 300+101.38, 600],
  stroke: 'blue',
  strokewidth: 1
});

var line3 = new Konva.Line({
  points: [300, 0, 300, 600],
  stroke: 'red',
  strokewidth: 1
})

var line4 = new Konva.Line({
  points: [0, 200, 600, 200],
  stroke: 'red',
  strokewidth: 1
})

var line5 = new Konva.Line({
  points: [0, 400, 600, 400],
  stroke: 'red',
  strokewidth: 1
})

var angle = -30 * (Math.PI / 180);
var slant = -1;
var point1 = new Konva.Circle({
  y: dim.RADIUS * Math.sin(angle) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y,
  x: dim.MIDLINE - (dim.RADIUS * Math.cos(angle) * slant),
  radius: 2,
  fill: 'green'
});

var testLayer = new Konva.Layer();
testLayer.add(line1, line2, line3, line4, line5);
//testLayer.add(point1);
stage.add(testLayer);
testLayer.moveToBottom();

var testBee = new Konva.Circle({
  x: dim.MIDLINE,
  y: dim.LOW_Y,
  radius: 2,
  fill: 'blue'
});
//layer.add(testBee);

// Events
const startStopAnimation = function(e) {
  if (e.target.innerText === 'Play') {
    e.target.innerText = 'Stop';
    $('.input-params').prop('disabled', true);

    animate.create(params, layer, bee);
    var startY = (dim.WAGGLE_LENGTH / 2) * Math.sin((Math.PI / 180) * (90 - params.angle)) + ((dim.START_Y - dim.END_Y) / 2) + dim.END_Y;
    var startX = dim.MIDLINE - ((dim.WAGGLE_LENGTH / 2) * Math.cos((Math.PI / 180) * (90 - params.angle)));
    bee.x(startX);
    bee.y(startY);
    bee.rotation(params.angle)
    animate.play();
  } else {
    e.target.innerText = 'Play';
    $('.input-params').prop('disabled', false);
    animate.stop(bee, params.angle);
  }
};


$('#btn-play').on('click', startStopAnimation);

$('#input-angle').on('change', () => {
  let angle = $('#input-angle').prop('value');
  if (angle === '' || isNaN(Number(angle))) {
    $('#input-angle').prop('value', params.angle);
  } else {
    params.angle = Number($('#input-angle').prop('value'));
  }
});

$('#input-distance').on('change', () => {
  params.distance = $('#input-distance').prop('value');
});