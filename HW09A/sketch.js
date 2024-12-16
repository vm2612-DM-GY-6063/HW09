// Original image, to use as reference for pixel colors
let oImg;

// Display image, to modify and display on canvas
let mImg;

// Color detection thresholds
let MONDRIAN_RED = { r: 220, g: 20, b: 20 };
let MONDRIAN_YELLOW = { r: 240, g: 240, b: 20 };
let MONDRIAN_BLUE = { r: 20, g: 20, b: 220 };

// Sliders for similarity thresholds
let redSlider, yellowSlider, blueSlider;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg"); // Original image
  mImg = loadImage("../assets/mondriaan.jpg"); // Display image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);

  // Load the original image pixels
  oImg.loadPixels();

  // Create sliders for adjusting thresholds
  redSlider = createSlider(10, 100, 40, 1);
  redSlider.position(20, 20);
  yellowSlider = createSlider(10, 100, 40, 1);
  yellowSlider.position(20, 50);
  blueSlider = createSlider(10, 100, 40, 1);
  blueSlider.position(20, 80);

  noStroke();
  textSize(14);
}

function draw() {
  // Load pixels for manipulation
  mImg.loadPixels();

  // Get slider values
  let redThreshold = redSlider.value();
  let yellowThreshold = yellowSlider.value();
  let blueThreshold = blueSlider.value();

  for (let y = 0; y < mImg.height; y++) {
    for (let x = 0; x < mImg.width; x++) {
      let index = (x + y * mImg.width) * 4;

      // Get pixel colors from the original image
      let r = oImg.pixels[index];
      let g = oImg.pixels[index + 1];
      let b = oImg.pixels[index + 2];

      // Detect and replace red
      if (isSimilar(r, g, b, MONDRIAN_RED, redThreshold)) {
        mImg.pixels[index] = 255; // Replace with white
        mImg.pixels[index + 1] = 255;
        mImg.pixels[index + 2] = 255;
      }
      // Detect and replace yellow
      else if (isSimilar(r, g, b, MONDRIAN_YELLOW, yellowThreshold)) {
        mImg.pixels[index] = 50; // Replace with green
        mImg.pixels[index + 1] = 200;
        mImg.pixels[index + 2] = 50;
      }
      // Detect and replace blue
      else if (isSimilar(r, g, b, MONDRIAN_BLUE, blueThreshold)) {
        mImg.pixels[index] = random(255); // Replace with random colors
        mImg.pixels[index + 1] = random(255);
        mImg.pixels[index + 2] = random(255);
      }
    }
  }

  // Update and display the manipulated image
  mImg.updatePixels();
  image(mImg, 0, 0);

  // Display slider values
  fill(0);
  text("Red Threshold: " + redThreshold, redSlider.x + 160, redSlider.y + 10);
  text("Yellow Threshold: " + yellowThreshold, yellowSlider.x + 160, yellowSlider.y + 10);
  text("Blue Threshold: " + blueThreshold, blueSlider.x + 160, blueSlider.y + 10);
}

// Function to check if two colors are similar
function isSimilar(r1, g1, b1, target, threshold) {
  return (
    abs(r1 - target.r) < threshold &&
    abs(g1 - target.g) < threshold &&
    abs(b1 - target.b) < threshold
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
