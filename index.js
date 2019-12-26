function randomColor() {
  let randPart = () => Math.floor(Math.random() * 256);
  return "rgb(" + randPart() + ", " + randPart() + ", " + randPart() + ")";
}

function processClick() {
  ctx.fillStyle = randomColor();
  ctx.fillRect(0, 0, width, height);
}

function drawPoly(c, points) {
  first = points[0];
  rest = points.slice(1);
  c.beginPath();
  c.moveTo(first.x, first.y);
  for (let point of rest) {
    c.lineTo(point.x, point.y);
  }
  c.closePath();
  // c.fill();
  c.stroke();
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function randTriangle(xMax, yMax) {
  // generate a random triangle
  function randPoint() {
    return new Point(
      Math.floor(Math.random() * xMax),
      Math.floor(Math.random() * yMax),
    );
  }
  return [...new Array(3)].map(randPoint);
}

function drawPainter(context) {
  let img = document.querySelector('img');
  context.drawImage(img, 0, 0);
  context.drawImage(img,
	      0, 0, 40, 40,
	      100, 0, 80, 160);
}

function sayHello(c) {
  c.fillStyle = 'black';
  c.fillText("Hello, world!", 20, 70);
}

function gradientBackground(c, w, h) {
  let grad = c.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, 'tan');
  grad.addColorStop(1, 'purple');
  c.fillStyle = grad;
  c.fillRect(0, 0, w, h);
}

window.onload = function() {

  var canvas = document.querySelector('.canvas');

  let c = canvas.getContext('2d');
  let w = canvas.width;
  let h = canvas.height;
  gradientBackground(c, w, h);
  drawPainter(c);
  sayHello(c);
  c.fillStyle = '#ccddff';
  c.strokeStyle = 'rgb(0, 128, 0)';
  c.lineWidth = 5;

  for (let i = 0; i < 10; i++) {
    drawPoly(c, randTriangle(w, h));
  }
}
