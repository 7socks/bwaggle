import Konva from 'konva';

const PEAK_Y = 200
const LOW_Y = 400

const animate = {
  anim: null
};

animate.create = ({angle, distance}, layer, target) => {
  var waggleDuration = 0.1993 + (2.0018 / 0.6717) * (1 - (Math.E ** (-0.6717 * (distance / 1000))));
  var arcDuration = 1.3712 + 0.5238 * (distance / 1000);

  animate.arcLeft = false;
  animate.anim = new Konva.Animation((frame) => {
    var cycleTime = frame.time % ((waggleDuration * 1000) + (arcDuration * 1000));
    if (cycleTime <= waggleDuration * 1000) {
      var rate = (LOW_Y - PEAK_Y) / (waggleDuration * 1000);
      var dist = -1 * frame.timeDiff * rate;
      target.move({x: 0, y: dist});
    } else {
      var rateY = (LOW_Y - PEAK_Y) / (arcDuration * 1000);
      var distY = frame.timeDiff * rateY;

      var rateX = 100 / (arcDuration * 1000 / 2);
      var distX = frame.timeDiff * rateX;

      // arc left or right
      if (frame.time % (((waggleDuration * 1000) + (arcDuration * 1000)) * 2) > waggleDuration * 1000 + arcDuration * 1000) {
        distX *= -1;
      }

      if (cycleTime - (waggleDuration * 1000) > arcDuration * 1000 / 2) {
        distX *= -1;
      }

      target.move({x: distX, y: distY});
    }

    // two phases: waggle and arc (return)
    // after waggle, arc path alternates left and right
  }, layer);
};

animate.reset = () => {
  animate.anim = null;
};

animate.play = () => {
  if (animate.anim !== null) {
    animate.arcLeft = false;
    animate.anim.start();
  }
};

animate.stop = (target) => {
  if (animate.anim !== null) {
    animate.anim.stop();
    target.x(300);
    target.y(LOW_Y);
  }
};

export default animate;