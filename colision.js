const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#fffA";

let removedCircles = 0;
const counter = document.createElement("div");
counter.style.position = "absolute";
counter.style.top = "10px";
counter.style.right = "20px";
counter.style.fontSize = "20px";
counter.style.fontWeight = "bold";
counter.innerText = `Círculos eliminados: ${removedCircles}`;
document.body.appendChild(counter);

class Circle {
  constructor(x, radius, color, text, speed) {
    this.posX = x;
    this.posY = -radius; // Inicia justo después del margen superior
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
    
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
  }

  update() {
    this.posY += this.speed; // Movimiento hacia abajo
    if (this.posY - this.radius > window_height) {
      this.posY = -this.radius; // Reiniciar la posición para caída infinita
    }
  }
}

let circles = [];

function generateCircle() {
  let radius = Math.random() * 30 + 20;
  let x = Math.random() * (window_width - radius * 2) + radius;
  let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  let speed = Math.random() * 3 + 1;
  let text = `C${circles.length + 1}`;
  circles.push(new Circle(x, radius, color, text, speed));
}

canvas.addEventListener("click", function (event) {
  const clickX = event.clientX;
  const clickY = event.clientY;

  circles = circles.filter(circle => {
    const dx = clickX - circle.posX;
    const dy = clickY - circle.posY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > circle.radius) {
      return true; // Mantener el círculo si no fue clickeado
    } else {
      removedCircles++;
      counter.innerText = `Círculos eliminados: ${removedCircles}`;
      return false; // Eliminar el círculo si fue clickeado
    }
  });
});

function animate() {
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach(circle => {
    circle.update();
    circle.draw(ctx);
  });
  requestAnimationFrame(animate);
}

setInterval(generateCircle, 1000); // Generar un círculo nuevo cada segundo
animate();
