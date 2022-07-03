import Konva from 'konva';

import dim from './dimensions.js';

const slopeShift = (time, angle, y, slant) => {
  // assume angle == 0 for now, since doing angular dance later
  // 101.38
  // y = mx - (101.38 / 2)

  // var slope = Math.sqrt((101.38)**2 + (dim.LOW_Y - dim.PEAK_Y - 32)**2);
  // var shift =  (-1 * slant * (y + (101.38)) / slope) - dim.MIDLINE;
  // console.log('shift', shift)

  var slope = Math.sqrt((dim.TARGET_WIDTH/ 2)**2 + (dim.LOW_Y - dim.PEAK_Y)**2);
  var shift = (-1 * slant * (y + dim.TARGET_WIDTH) / slope) - dim.MIDLINE;

  return shift;
  return -1 * dim.MIDLINE;
};

const animate = {
  anim: null
};

animate.create = ({angle, distance}, layer, target) => {
  var waggleDuration = 0.1993 + (2.0018 / 0.6717) * (1 - (Math.E ** (-0.6717 * (distance / 1000))));
  var arcDuration = 1.3712 + 0.5238 * (distance / 1000);
  var turnDuration = 0;

  //animate.MIDLINE_ERROR = 0;
  animate.anim = new Konva.Animation((frame) => {
    var cycleTime = frame.time % ((waggleDuration * 1000) + (arcDuration * 1000) + turnDuration);
    if (cycleTime <= waggleDuration * 1000) {
      var rate = (dim.LOW_Y - dim.PEAK_Y) / (waggleDuration * 1000);
      var dist = -1 * frame.timeDiff * rate;
      target.move({x: 0, y: dist});
      //animate.MIDLINE_ERROR = target.x() - dim.MIDLINE;
    } else if (cycleTime <= (waggleDuration * 1000) + turnDuration) {

    } else {
      // var arcLength = getArcLength(dim.LOW_Y - dim.PEAK_Y / 2, dim.RADIUS, -90, 90);

      // var angleRate = arcLength / (arcDuration * 1000);
      // var angleStart = getArcLength((dim.LOW_Y - dim.PEAK_Y) / 2, dim.RADIUS, 0, -90);

      // var slant = -1;
      // if (frame.time % (((waggleDuration * 1000) + (arcDuration * 1000) + turnDuration) * 2) > waggleDuration * 1000 + arcDuration * 1000 + turnDuration) {
      //   slant = 1;
      // }

      // var angle = (cycleTime - (turnDuration + waggleDuration * 1000)) * angleRate + angleStart;

      // var vertical = (dim.LOW_Y - dim.PEAK_Y) / 2;
      // var horizontal = dim.RADIUS;
      // var radius = (horizontal * vertical) / Math.sqrt(((horizontal**2) * (Math.sin(angle)**2)) + ((vertical**2) * (Math.cos(angle)**2)));

      // var pointY = radius * Math.sin(angle) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y;
      // //var pointX = radius * Math.cos(angle) - slopeShift((cycleTime - (waggleDuration * 1000)) / arcDuration, 0, pointY, slant);
      // var pointX = (dim.MIDLINE + animate.MIDLINE_ERROR) - (radius * Math.cos(angle) * slant);

      //var arcLength = getArcLength(-90, 90);
      var arcLength = Math.PI;

      var angleRate = arcLength / (arcDuration * 1000);
      var angleStart = -90 * (Math.PI / 180)

      var angle = (cycleTime - (turnDuration + waggleDuration * 1000)) * angleRate + angleStart;

      var slant = 1;
      if (frame.time % (((waggleDuration * 1000) + (arcDuration * 1000) + turnDuration) * 2) > waggleDuration * 1000 + arcDuration * 1000 + turnDuration) {
        slant = -1;
      }

      var radius = dim.RADIUS;

      var pointY = radius * Math.sin(angle) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y - (dim.TARGET_HEIGHT / 2);
      var pointX = dim.MIDLINE - (radius * Math.cos(angle) * slant) - (dim.TARGET_WIDTH / 2);

      target.x(pointX);
      target.y(pointY);
    }
  }, layer);
};

animate.reset = () => {
  animate.anim = null;
};

animate.play = () => {
  if (animate.anim !== null) {
    animate.anim.start();
  }
};

animate.stop = (target) => {
  if (animate.anim !== null) {
    animate.anim.stop();
    target.x(dim.MIDLINE - (dim.TARGET_WIDTH / 2));
    target.y(dim.LOW_Y - (dim.TARGET_HEIGHT / 2));
  }
};

export default animate;