const clearBtn = document.getElementById("clear");
const signBtn = document.getElementById("sign");
const signImage = document.getElementById("signImage");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
let drawMode = false;
let pos = { x: 0, y: 0 };

resize();

// window.addEventListener("resize", resize);

canvas.addEventListener("mouseout", () => (drawMode = false));
canvas.addEventListener("mouseup", () => {
  drawMode = false;
  setPosition(e);
});
canvas.addEventListener("mousedown", (e) => {
  drawMode = true;
  setPosition(e);
});
canvas.addEventListener("mousemove", (e) => drawMode && drawCircle(e));

clearBtn.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
);

signBtn.addEventListener("click", () => toPng());

function drawCircle(e) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000000";

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.closePath();
  ctx.stroke();
}

function setPosition(e) {
  pos.x = e.clientX - 10;
  pos.y = e.clientY - 45;
}

function resize() {
  ctx.canvas.width = 800 // window.innerWidth - 15;
  ctx.canvas.height = 400 // window.innerHeight - 70;
}

function toPng() {
  const img = canvas.toDataURL("image/png");
  signImage.src = img;

  const link = document.createElement("a");
  link.href = img;
  link.download = getName();

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getName() {
  const today = new Date();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month =
    today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const year = today.getFullYear();

  return `Sign_${day}.${month}.${year}.png`;
}
