const colors = document.querySelectorAll(".colors");
const lineCap = document.getElementById("lineCap");
const clearButton = document.getElementById("clear");
const canvas = document.getElementById("canvas");
const erase = document.getElementById("erase");
const colorPicker = document.getElementById("colorPicker");
const brush = document.getElementById("brush");

console.log(colorPicker);
var imageData;
var startX = 0,
    startY = 0,
    mouseX = 0,
    mouseY = 0;
var isDrawing = false;
var hasLoaded = false;
var canvasWidth = window.innerWidth - 250;
var canvasHeight = window.innerHeight - 8;
var ctx = null;
var bounds = null;
var colourValue = "#000000";

const slider = document.getElementById("stroke");

slider.oninput = () => {
    console.log(slider.value);
    ctx.lineWidth = slider.value;
};

function downloadCanvas(el) {
    const imageURI = canvas.toDataURL("image/png");
    el.href = imageURI;
}

function drawFree() {
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
}

function onmousedown(e) {
    if (hasLoaded && e.button === 0) {
        if (!isDrawing) {
            startX = e.clientX - bounds.left;
            startY = e.clientY - bounds.top;

            isDrawing = true;
        }

        ctx.beginPath();
        drawFree();
    }
}

function onmouseup(e) {
    if (hasLoaded && e.button === 0) {
        isDrawing = false;
    }
    drawFree();
    ctx.beginPath()
}

function onmousemove(e) {
    if (hasLoaded) {
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;

        if (isDrawing) {
            console.log(mouseX, mouseY);
            drawFree();
        }
    }
}

function init() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    bounds = canvas.getBoundingClientRect();

    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = slider.value;

    
    canvas.addEventListener("mousedown", onmousedown, false);

    canvas.addEventListener("mousemove", onmousemove, false);

    canvas.addEventListener("mouseup", onmouseup, false);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    hasLoaded = true;

    drawFree();
}

window.addEventListener("load", init, false);

colorPicker.onchange = (e) => {
    colourValue = e.target.value;
    ctx.strokeStyle = e.target.value;
};

clearButton.onclick = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

brush.onclick = (e) => {
    ctx.strokeStyle = colourValue;
};

erase.onclick = (e) => {
    ctx.strokeStyle = "#ffffff";
};

lineCap.onchange = (e) => {
    ctx.lineCap = e.target.value;
};
