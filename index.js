class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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
  c.stroke();
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
  grad.addColorStop(0, 'pink');
  grad.addColorStop(.5, 'tan');
  grad.addColorStop(.7, 'black');
  grad.addColorStop(1, 'purple');
  c.fillStyle = grad;
  c.fillRect(0, 0, w, h);
}

window.onload = function() {
  var canvas = document.querySelector('.canvas');

  let c = canvas.getContext('2d');
  let w = canvas.width;
  let h = canvas.height;
  drawPainter(c);
  sayHello(c);
  c.strokeStyle = 'rgb(0, 128, 0)';
  c.lineWidth = 5;

  c.translate(w/2, 0);

  // Draw nesting, clipped triangles
  c.save();
  for (let i = 0; i < 3; i++) {
    drawPoly(c, randTriangle(w/2, h/2));
    c.clip();
    let fill = (i % 2 == 0) ? 'black' : 'white';
    c.fillStyle = fill;
    c.fill()
  }
  c.restore();

  c.translate(0, h/2);

  // Draw many random triangles
  c.save();
  c.globalAlpha = .2;
  c.lineWidth = 1;
  for (let i = 0; i < 2000; i++) {
    drawPoly(c, randTriangle(w/2, h/2));
    let fill = randomColor();
    c.fillStyle = fill;
    c.fill()
  }
  c.globalAlpha = 1;
  c.fillStyle = 'black';
  c.fillText("dang that's a lot of triangles", 20, 70);
  c.restore();
  c.translate(-w/2, 0);
  gradientBackground(c, w/2, h/2);
}
