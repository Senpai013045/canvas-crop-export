//@ts-check
const canvas = document.querySelector("canvas");
const button = document.querySelector("button");

if (!canvas) {
  throw new Error("Canvas not found");
}

if (!button) {
  throw new Error("Button not found");
}

const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error("Canvas context not found");
}

//canvas is 500 x 500
canvas.width = 500;
canvas.height = 500;

//draw a black background
ctx.fillStyle = "violet";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66", "#FFF6E5"];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = () => {
  return colors[getRandomNumber(0, colors.length - 1)];
};

const getRandomRadius = () => {
  return getRandomNumber(10, 50);
};

const drawCircle = (x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

for (let i = 0; i < 100; i++) {
  const x = getRandomNumber(0, canvas.width);
  const y = getRandomNumber(0, canvas.height);
  const radius = getRandomRadius();
  const color = getRandomColor();
  drawCircle(x, y, radius, color);
}

const drawRectangle = (x, y, width, height, color) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
};

const cropData = {
  x: 137,
  y: 342,
  width: 205,
  height: 101,
};

drawRectangle(
  cropData.x,
  cropData.y,
  cropData.width,
  cropData.height,
  "#00FF00"
);

button.addEventListener("click", () => {
  const newCanvas = document.createElement("canvas");
  const newCtx = newCanvas.getContext("2d");
  newCanvas.width = cropData.width;
  newCanvas.height = cropData.height;
  newCtx?.drawImage(
    canvas,
    cropData.x,
    cropData.y,
    cropData.width,
    cropData.height,
    0,
    0,
    cropData.width,
    cropData.height
  );
  // const link = document.createElement("a");
  // link.href = newCanvas.toDataURL();
  // link.download = "image.png";
  // link.click();
  //get svg
  const svg = newCanvas.toDataURL("image/svg+xml");
  const link = document.createElement("a");
  link.href = svg;
  link.download = "image.svg";
  link.click();
});
