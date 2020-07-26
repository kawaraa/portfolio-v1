"use strict";

const requestAnimation =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const pagesContainer = document.getElementById("pages-container");
const width = pagesContainer.offsetWidth;
const height = pagesContainer.offsetHeight;
const cube = document.getElementById("cube");
const intro = document.getElementById("intro");
const about = document.getElementById("about");
const portfolio = document.getElementById("portfolio");
const contact = document.getElementById("contact");
const canvas = document.getElementById("background");
canvas.width = width;
canvas.height = height;

let transPlus = `translateZ(${width / 2}px)`;
let transMin = `translateZ(-${width / 2}px)`;

pagesContainer.style.perspective = width + "px";
cube.style.width = width + "px";
cube.style.transform = transMin;
document.querySelectorAll(".pages").forEach((el) => {
  el.style.width = width + "px";
});
intro.style.transform = "rotateY(0deg)" + transPlus;
about.style.transform = " rotateY(90deg)" + transPlus;
portfolio.style.transform = " rotateY(180deg)" + transPlus;
contact.style.transform = " rotateY(-90deg)" + transPlus;
about.style.display = "block";
portfolio.style.display = "block";
contact.style.display = "block";

function hidePages(page1, page2, page3) {
  page1.style.display = "none";
  page2.style.display = "none";
  page3.style.display = "none";
}

function showPage() {
  if (location.hash === "#intro" || location.hash === "") {
    intro.style.display = "block";
    about.style.display = "block";
    portfolio.style.display = "block";
    contact.style.display = "block";
    cube.style.transform = transMin + "rotateY(0deg)";
    setTimeout(() => hidePages(about, portfolio, contact), 550);
  }
  switch (location.hash) {
    case "#about":
      intro.style.display = "block";
      about.style.display = "block";
      portfolio.style.display = "block";
      contact.style.display = "block";
      cube.style.transform = transMin + "rotateY(-90deg)";
      setTimeout(() => hidePages(intro, portfolio, contact), 550);
      break;
    case "#portfolio":
      intro.style.display = "block";
      about.style.display = "block";
      portfolio.style.display = "block";
      contact.style.display = "block";
      cube.style.transform = transMin + "rotateY(-180deg)";
      setTimeout(() => hidePages(intro, about, contact), 550);
      renderProjects("all");
      break;
    case "#contact":
      intro.style.display = "block";
      about.style.display = "block";
      portfolio.style.display = "block";
      contact.style.display = "block";
      cube.style.transform = transMin + "rotateY(90deg)";
      setTimeout(() => hidePages(intro, about, portfolio), 550);
      break;
  }
  animateLinks();
}

window.onhashchange = () => setTimeout(() => showPage(), 600);

// Background animation
class Circle {
  constructor(c, x, y, angle, size, col, spd, acc) {
    this.c = c;
    this.size = size;
    this.spd = spd;
    this.col = col;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.dx = x;
    this.dy = y;
    this.acc = acc;
  }
  draw() {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.c.fillStyle = this.col;
    this.c.fill();
    this.c.closePath();
    this.c.beginPath();
    this.c.strokeStyle = "#1B3A42";
    this.c.moveTo(this.x, this.y);
    this.c.lineTo(this.x + 460, this.y - 1000);
    this.c.stroke();
    this.c.closePath();
    this.update();
  }
  update() {
    this.angle += this.spd;
    this.x = this.dx + Math.cos(this.angle) * this.acc;
    this.y = this.dy + Math.sin(this.angle) * this.acc;
  }
}
function multiplyObject(canvas, num, size, spd) {
  canvas.style.background = "#1C1E27";
  const ctx = canvas.getContext("2d");
  const shapes = [];
  for (let i = 0; i < num; i++) {
    shapes.push(
      new Circle(ctx, width / 2 + 50, height / 2 + i * 2, i, size, "#D9005A", spd, width / 2 + i * i)
    );
    shapes.push(new Circle(ctx, width / 2 + 50, height / 2 + i * i, i, size, "#4DFF99", spd, 100 + i * i));
    shapes.push(new Circle(ctx, width / 2, height / 2, i, size, "#E1B6AB", spd, 110 + i * i));
  }
  function animate() {
    requestAnimation(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((obj) => obj.draw());
  }
  animate();
}
multiplyObject(canvas, 20, 1.5, 0.0005);
