import Konva from 'konva';

import dim from './dimensions.js';

const animate = {
  anim: null
};

animate.create = ({angle, distance}, layer, target) => {
  var waggleDuration = 0.1993 + (2.0018 / 0.6717) * (1 - (Math.E ** (-0.6717 * (distance / 1000))));
  var arcDuration = 1.3712 + 0.5238 * (distance / 1000);
  var turnDuration = 0;

  animate.anim = new Konva.Animation((frame) => {
    var cycleTime = frame.time % ((waggleDuration * 1000) + (arcDuration * 1000) + turnDuration);
    if (cycleTime <= waggleDuration * 1000) {
      var startX = dim.MIDLINE - (dim.RADIUS * Math.cos((Math.PI / 180) * (90 - angle))) - (dim.TARGET_WIDTH / 2);
      var startY = dim.RADIUS * Math.sin((Math.PI / 180) * (90 - angle)) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y - (dim.TARGET_HEIGHT / 2);

      var endX = dim.MIDLINE - (dim.RADIUS * Math.cos((Math.PI / 180) * (angle - 90)) * -1) - (dim.TARGET_WIDTH / 2);
      var endY = dim.RADIUS * Math.sin((Math.PI / 180) * (angle - 90)) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y - (dim.TARGET_HEIGHT / 2);

      var rateX = (endX - startX) / (waggleDuration * 1000);
      var rateY = (endY - startY) / (waggleDuration * 1000);

      target.x(cycleTime * rateX + startX);
      target.y(cycleTime * rateY + startY);
    } else if (cycleTime <= (waggleDuration * 1000) + turnDuration) {
    } else {
      var slant = 1;
      if (frame.time % (((waggleDuration * 1000) + (arcDuration * 1000) + turnDuration) * 2) > waggleDuration * 1000 + arcDuration * 1000 + turnDuration) {
        slant = -1;
      }

      var angleRate = Math.PI / (arcDuration * 1000);
      var angleStart = (-90 - angle * slant) * (Math.PI / 180);

      var radians = (cycleTime - (turnDuration + waggleDuration * 1000)) * angleRate + angleStart;

      var pointY = dim.RADIUS * Math.sin(radians) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y - (dim.TARGET_HEIGHT / 2);
      var pointX = dim.MIDLINE - (dim.RADIUS * Math.cos(radians) * slant) - (dim.TARGET_WIDTH / 2);

      console.log(pointX, pointY)

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

animate.stop = (target, angle) => {
  if (animate.anim !== null) {
    animate.anim.stop();
    var startY = dim.RADIUS * Math.sin((Math.PI / 180) * (90 - angle)) + ((dim.LOW_Y - dim.PEAK_Y) / 2) + dim.PEAK_Y - (dim.TARGET_HEIGHT / 2);
    var startX = dim.MIDLINE - (dim.RADIUS * Math.cos((Math.PI / 180) * (90 - angle))) - (dim.TARGET_WIDTH / 2);
    target.x(startX);
    target.y(startY);
  }
};

export default animate;