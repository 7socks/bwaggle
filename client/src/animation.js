import Konva from 'konva';

import dim from './dimensions.js';

const animate = {
  anim: null,
  distance: null,
  angle: null,
  target: null
};

animate.create = ({angle, distance}, layer, target) => {
  animate.angle = angle;
  animate.target = target;

  var waggleDuration = 0.1993 + (2.0018 / 0.6717) * (1 - (Math.E ** (-0.6717 * (distance / 1000))));
  var arcDuration = 1.3712 + 0.5238 * (distance / 1000);

  // Waggle phase constants
  var startX = dim.MIDLINE - ((dim.WAGGLE_LENGTH / 2) * Math.cos((Math.PI / 180) * (90 - angle)));
  var startY = (dim.WAGGLE_LENGTH / 2) * Math.sin((Math.PI / 180) * (90 - angle)) + ((dim.START_Y - dim.END_Y) / 2) + dim.END_Y;
  var endX = dim.MIDLINE - ((dim.WAGGLE_LENGTH / 2) * Math.cos((Math.PI / 180) * (angle - 90)) * -1);
  var endY = (dim.WAGGLE_LENGTH / 2) * Math.sin((Math.PI / 180) * (angle - 90)) + ((dim.START_Y - dim.END_Y) / 2) + dim.END_Y;
  var rateX = (endX - startX) / (waggleDuration * 1000);
  var rateY = (endY - startY) / (waggleDuration * 1000);

  // Arc phase constants
  var angleRate = ((180 + dim.ANGLE_OFFSET * 2) * (Math.PI / 180)) / (arcDuration * 1000);
  var offsetX = dim.OFFSET * Math.cos(angle * (Math.PI / 180));
  var offsetY = dim.OFFSET * Math.sin(angle * (Math.PI / 180));

  animate.anim = new Konva.Animation((frame) => {
    var cycleTime = frame.time % ((waggleDuration * 1000) + (arcDuration * 1000));
    if (cycleTime <= waggleDuration * 1000) {
      var wagglePeriod = (cycleTime % 10) / 10;
      if (waggleDuration * 1000 - cycleTime < 10) {
        target.rotation(angle);
      } else {
        if (wagglePeriod < 1/3) {
          target.rotation(angle - 5);
        } else if (wagglePeriod > 2/3) {
          target.rotation(angle + 5);
        } else {
          target.rotation(angle);
        }
      }

      target.x(cycleTime * rateX + startX);
      target.y(cycleTime * rateY + startY);
    } else {
      var slant = 1;
      if (frame.time % (((waggleDuration * 1000) + (arcDuration * 1000)) * 2) > waggleDuration * 1000 + arcDuration * 1000) {
        slant = -1;
      }

      var angleStart = (-90 - (angle - dim.ANGLE_OFFSET) * slant) * (Math.PI / 180);
      var radians = (cycleTime - (waggleDuration * 1000)) * angleRate + angleStart;

      var pointY = dim.RADIUS * Math.sin(radians) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y + (offsetY * slant);
      var pointX = dim.MIDLINE - (dim.RADIUS * Math.cos(radians) * slant) + (offsetX * slant);

      target.x(pointX);
      target.y(pointY);

      var rotateRate = slant * -360 / (arcDuration * 1000);
      target.rotate(frame.timeDiff * rotateRate);
    }
  }, layer);
};

animate.reset = () => {
  var startY = (dim.WAGGLE_LENGTH / 2) * Math.sin((Math.PI / 180) * (90 - animate.angle)) + ((dim.START_Y - dim.END_Y) / 2) + dim.END_Y;
  var startX = dim.MIDLINE - ((dim.WAGGLE_LENGTH / 2) * Math.cos((Math.PI / 180) * (90 - animate.angle)));
  animate.target.rotation(animate.angle);
  animate.target.x(startX);
  animate.target.y(startY);
};

animate.play = () => {
  if (animate.anim !== null) {
    animate.anim.start();
  }
};

animate.stop = () => {
  if (animate.anim !== null) {
    animate.reset();
    animate.anim.stop();
  }
};

export default animate;