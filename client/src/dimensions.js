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

// a = b * tan(89)
// a = 100 --> b = 100 - tan(89)
// --> a^2 + b^2 = c^2
// --> new radius = sqrt(a^2 + b^2)
dim.ANGLE_OFFSET = 5;
let b = (dim.WAGGLE_LENGTH / 2) - Math.tan((90 - dim.ANGLE_OFFSET) * (Math.PI / 180));
dim.RADIUS = Math.sqrt((dim.WAGGLE_LENGTH / 2)**2 + b**2);
//dim.X_OFFSET = dim.RADIUS * Math.cos((Math.PI / 180) * dim.ANGLE_OFFSET);
dim.OFFSET = (dim.WAGGLE_LENGTH / 2) - dim.RADIUS;

//dim.RADIUS = 100; // radius on horizontal (x) axis

// defines the limits of the straight line (waggle phase)
dim.START_Y = (dim.CANVAS_HEIGHT + dim.WAGGLE_LENGTH) / 2;
dim.END_Y = (dim.CANVAS_HEIGHT - dim.WAGGLE_LENGTH) / 2;

// defines the limits of the arc paths
dim.PEAK_Y = (dim.CANVAS_HEIGHT / 2) - dim.RADIUS;
dim.LOW_Y = (dim.CANVAS_HEIGHT / 2) + dim.RADIUS;

export default dim;

// calculating larger return arcs to handle rotation
// waggle path length = 200
// 1deg off from vert axis on circle
// offsets:
// x = radius * cos(angle ± 1) - radius * cos(angle)
// y = radius * sin(angle ± 1) - radius * sin(angle)
// then add/subtract this amount to the x/y coords (NOT in other calcs)

// dif calculation...
// draw straight line thru 2 points each 1deg off of unknown diameter,
// calculate using trig the radius of a circle where this line === 200

// a = b * tan(89)
// a = 100 --> b = 100 - tan(89)
// --> a^2 + b^2 = c^2
// --> new radius = sqrt(a^2 + b^2)
// also the b values are your x/y offset vals
// no the inverse of this is

// where the