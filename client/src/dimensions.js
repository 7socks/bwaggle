// CANVAS DIMENSIONS CONSTANTS

const dim = {};

// Bee image dimensions
dim.TARGET_HEIGHT = 64;
dim.TARGET_WIDTH = 101.38;

// Canvas size
dim.CANVAS_HEIGHT = 600;
dim.CANVAS_WIDTH = 600;

// Animation path
dim.MIDLINE = dim.CANVAS_WIDTH / 2;
dim.WAGGLE_LENGTH = 200;

dim.ANGLE_OFFSET = 5;
let b = (dim.WAGGLE_LENGTH / 2) - Math.tan((90 - dim.ANGLE_OFFSET) * (Math.PI / 180));
dim.RADIUS = Math.sqrt((dim.WAGGLE_LENGTH / 2)**2 + b**2);
dim.OFFSET = (dim.WAGGLE_LENGTH / 2) - dim.RADIUS;

// defines the limits of the straight line (waggle phase)
dim.START_Y = (dim.CANVAS_HEIGHT + dim.WAGGLE_LENGTH) / 2;
dim.END_Y = (dim.CANVAS_HEIGHT - dim.WAGGLE_LENGTH) / 2;

// defines the limits of the arc paths
dim.PEAK_Y = (dim.CANVAS_HEIGHT / 2) - dim.RADIUS;
dim.LOW_Y = (dim.CANVAS_HEIGHT / 2) + dim.RADIUS;

export default dim;