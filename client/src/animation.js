import Konva from 'konva';

const PEAK_Y = 200
const LOW_Y = 400
const RADIUS = 100;

const getArcLength = (a, b, t1, t2) => {
  return Math.atan((a / b) * Math.tan(t1)) - Math.atan((a / b) * Math.tan(t2));
};

const animate = {
  anim: null
};

animate.create = ({angle, distance}, layer, target) => {
  var waggleDuration = 0.1993 + (2.0018 / 0.6717) * (1 - (Math.E ** (-0.6717 * (distance / 1000))));
  var arcDuration = 1.3712 + 0.5238 * (distance / 1000);

  animate.anim = new Konva.Animation((frame) => {
    var cycleTime = frame.time % ((waggleDuration * 1000) + (arcDuration * 1000));
    if (cycleTime <= waggleDuration * 1000) {
      var rate = (LOW_Y - PEAK_Y) / (waggleDuration * 1000);
      var dist = -1 * frame.timeDiff * rate;
      target.move({x: 0, y: dist});
    } else {
      var arcLength = getArcLength(LOW_Y - PEAK_Y / 2, RADIUS, -90, 90);

      var angleRate = arcLength / (arcDuration * 1000) * -1;
      var angleStart = getArcLength(LOW_Y - PEAK_Y / 2, RADIUS, 0, -90);

      if (frame.time % (((waggleDuration * 1000) + (arcDuration * 1000)) * 2) > waggleDuration * 1000 + arcDuration * 1000) {
        angleRate *= -1;
        //angleStart = 0;
      }

      var angle = (cycleTime - (waggleDuration * 1000)) * angleRate + angleStart;

      var vertical = (LOW_Y - PEAK_Y);
      var horizontal = RADIUS * 2;
      var radius = (horizontal * vertical) / Math.sqrt(((horizontal**2) * (Math.sin(angle)**2)) + ((vertical**2) * (Math.cos(angle)**2)));

      var pointX = radius * Math.cos(angle) + 300;
      var pointY = radius * Math.sin(angle) + ((LOW_Y - PEAK_Y) / 2) + PEAK_Y;
      //console.log(pointX, pointY)

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
    target.x(300);
    target.y(LOW_Y);
  }
};

export default animate;