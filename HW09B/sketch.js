// Mirror Effect Display with Yoko Ono-inspired art in p5.js

let video;
let shapes = [];
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element to only display the canvas

  // Initialize shapes inspired by Yoko Ono's instruction-based art
  for (let i = 0; i < 10; i++) {
    shapes.push({
      x: random(width),
      y: random(height),
      size: random(10, 50),
      speed: random(1, 3),
    });
  }

  // Initialize stars for additional artistic effect
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(2, 5),
      twinkle: random(0.5, 1.5),
    });
  }
}

function draw() {
  background(0);

  // Mirror effect
  video.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width / 2; x++) {
      let i = (y * width + x) * 4;
      let mirroredIndex = (y * width + (width - x - 1)) * 4;

      // Copy pixel data from one side to the mirrored side
      video.pixels[mirroredIndex] = video.pixels[i];     // Red
      video.pixels[mirroredIndex + 1] = video.pixels[i + 1]; // Green
      video.pixels[mirroredIndex + 2] = video.pixels[i + 2]; // Blue
      video.pixels[mirroredIndex + 3] = video.pixels[i + 3]; // Alpha
    }
  }
  video.updatePixels();
  image(video, 0, 0, width, height);

  // Draw shapes as interactive art elements
  for (let shape of shapes) {
    fill(255, 150);
    noStroke();
    ellipse(shape.x, shape.y, shape.size);

    // Move shapes downward and reset if off-screen
    shape.y += shape.speed;
    if (shape.y > height) {
      shape.y = 0;
      shape.x = random(width);
      shape.size = random(10, 50);
      shape.speed = random(1, 3);
    }
  }

  // Draw twinkling stars
  for (let star of stars) {
    fill(255, 255 * star.twinkle);
    noStroke();
    ellipse(star.x, star.y, star.size);

    // Adjust twinkle effect
    star.twinkle += random(-0.05, 0.05);
    star.twinkle = constrain(star.twinkle, 0.5, 1.5);
  }

  // Overlay text inspired by Yoko Ono
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Imagine yourself reflected in every movement.", width / 2, height - 20);
}
