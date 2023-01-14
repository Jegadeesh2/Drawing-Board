//Element
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = window.innerHeight * 0.6;

//Variables
let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
let color = "black";
let width = "3";
let is_drawing = false;

//EventListeners
//Events for touch screen
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
//Events for mouse
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

//Functions
function changeColor(element) {
  color = element.style.background;
}

function changeWidth(element) {
  width = element.innerHTML;
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
}

function getX(event) {
  if (event.pageX == undefined) {
    return event.targetTouches[0].pageX - canvas.offsetLeft;
  } else {
    return event.pageX - canvas.offsetLeft;
  }
}

function getY(event) {
  if (event.pageY == undefined) {
    return event.targetTouches[0].pageY - canvas.offsetTop;
  } else {
    return event.pageY - canvas.offsetTop;
  }
}

function EraseAll() {
  context.fillStyle = "white";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function SaveImage() {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
}
