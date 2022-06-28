import Konva from 'konva';

const animate = {
  anim: null
};

animate.create = ({angle, distance}) => {
  // calculate duration etc from input data

  animate.anim = new Konva.Animation((node) => {

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

animate.stop = () => {
  if (animate.anim !== null) {
    animate.anim.stop();
  }
};

export default animate;