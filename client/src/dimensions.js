// CANVAS DIMENSIONS DEFINITION CONSTANTS

const dim = {};

// Bee image dimensions
dim.TARGET_HEIGHT = 64;
dim.TARGET_WIDTH = 101.38;

// Canvas size
dim.CANVAS_HEIGHT = 600;
dim.CANVAS_WIDTH = 600;

// Animation path boundaries
dim.MIDLINE = (dim.CANVAS_WIDTH - dim.TARGET_WIDTH) / 2;
dim.RADIUS = 100; // radius on horizontal (x) axis

dim.PEAK_Y = 200 - dim.TARGET_HEIGHT;
dim.LOW_Y = 400;

dim.VERTICAL = dim.LOW_Y - dim.PEAK_Y;

export default dim;