//getting elements for dom manupilation
var canvas = document.getElementById("my-canvas");
var context = canvas.getContext("2d");

// to get the coordinates of mouse pointer
function getCanvasCoordinates(event) {
  var rectangle = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rectangle.width;
  var scaleY = canvas.height / rectangle.height;
  console.log(canvas.height, rectangle.height);
  var x = (event.clientX - rectangle.left) * scaleX;
  var y = (event.clientY - rectangle.top) * scaleY;
  return { x: x, y: y };
}

// if this function is not their lines are not drawn properly
var snapshot;
function takeSnapshot() {
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreSnapshot() {
  context.putImageData(snapshot, 0, 0);
}

var dragging = false,
  dragStartLocation;
//drawing line
function drawLine(position) {
  context.beginPath();
  context.moveTo(dragStartLocation.x, dragStartLocation.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

// when mouse cliked and dragged
function dragDown(event) {
  dragStartLocation = getCanvasCoordinates(event);
  dragging = true;
  takeSnapshot();
}
// when mouse dragged
function drag(event) {
  var position;
  if (dragging === true) {
    restoreSnapshot();
    position = getCanvasCoordinates(event);
    drawLine(position);
  }
}
// when mouse up and dragged
function dragUp(event) {
  dragging = false;
  var position = getCanvasCoordinates(event);
  drawLine(position);
}
// initiallization
function init() {
  let dpi = window.devicePixelRatio;
  canvas.setAttribute("height", 700 * dpi);
  canvas.setAttribute("width", 1400 * dpi);
  context.strokeStyle = "blue";
  context.lineWidth = 6;
  context.lineCap = "square";

  //when mouse is clicked
  canvas.addEventListener("mousedown", dragDown, false);
  //when mouse is moved
  canvas.addEventListener("mousemove", drag, false);
  //when mouse is uncliked
  canvas.addEventListener("mouseup", dragUp, false);
}
// when window is load
window.addEventListener("load", init, false);
