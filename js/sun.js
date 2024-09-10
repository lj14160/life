let inter;
let lineCan = null;
let ballCan = null;
function drawLine() {
  lineCan = document.querySelector("#canvas1");
  let ctt = lineCan.getContext("2d");
  ctt.translate(410, 410);
  ell(ctt, 50, 25);
  ell(ctt, 100, 50);
  ell(ctt, 150, 75);
  ell(ctt, 200, 100);
  ell(ctt, 250, 125);
  ell(ctt, 300, 150);
  ell(ctt, 350, 175);
  ell(ctt, 400, 200);
  sun(ctt);
  drawStar(ctt);
}
function ell(ctt, a, b) {
  ctt.save();
  ctt.beginPath();
  ctt.strokeStyle = "#111";
  ctt.ellipse(0, 0, a, b, 0, 0, 360);
  ctt.closePath();
  ctt.stroke();
  ctt.restore();
}

//太阳
function sun(ctt) {
  ctt.save();
  ctt.beginPath();
  let grd = ctt.createRadialGradient(0, 0, 5, 0, 0, 20);
  grd.addColorStop(0.2, "red");
  grd.addColorStop(1, "yellow");
  ctt.fillStyle = grd;
  ctt.arc(0, 0, 20, 0, 360);
  ctt.fill();
  ctt.restore();
}

function drawBall() {
  ballCan = document.querySelector("#canvas2");
  let ctx = ballCan.getContext("2d");
  ctx.translate(410, 410);
  ball(ctx, 0, 50, 25, 0.5, 1, "#1A32E4", "#8D98ED");
  ball(ctx, 0, 100, 50, 0.8, 1, "#EF5310", "#EEB9A9");
  ball(ctx, 0, 150, 75, 1, 1, "#0F72EB", "#155EB8");
  ball(ctx, 0, 200, 100, 1.2, 1, "#F2B312", "#E7D07F");
  ball(ctx, 0, 250, 125, 1.4, 1, "#F4E813", "#CCB031");
  ball(ctx, 0, 300, 150, 1.6, 0.8, "#EDE483", "#F4EEAC");
  ball(ctx, 0, 350, 175, 1.8, 0.7, "#48EFCE");
  ball(ctx, 0, 400, 200, 2, 0.6, "#9983F4", "#B5A7EF");
}

//    var in1,in2,in3,in3,in3,in4,in5
function ball(ctx, x0, a, b, s, j = 1, y1 = "#9CF438", y2 = "skyblue") {
  ctx.beginPath();
  let x = x0;
  let f = 1;
  let hisRect = [];
  inter = setInterval(() => {
    ctx.save();
    ctx.beginPath();
    let grd = ctx.createRadialGradient(0, 0, 2, 0, 0, 10);
    grd.addColorStop(0.2, y1);
    grd.addColorStop(1, y2);
    ctx.fillStyle = grd;

    if (x >= a - 2 || x <= -(a - 2)) {
      x += f * 0.2 * s * j;
    } else {
      x += f * s;
    }
    var y = x >= a || x <= -a ? 0 : b * Math.sqrt(1 - (x * x) / (a * a)) * f;

    // ctx.clearRect(x - 15, y - 15, 30, 30);
    ctx.clearRect(hisRect[0] - 15, hisRect[1] - 15, 30, 30);
    hisRect = [x, y];
    if (y == 0) f *= -1;
    ctx.translate(x, y);
    ctx.arc(0, 0, 10, 0, 360);
    ctx.fill();
    ctx.restore();
  }, 1000 / 60);
}
function drawStar() {
  let can = document.querySelector("#canvas3");
  can.width = innerWidth;
  can.height = innerHeight;
  let ctx = can.getContext("2d");

  let st = null;
  shanStar(st, ctx);
}
function shanStar(st, ctx) {
  st && clearInterval(st);
  let stars = [];
  let t = 0;
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(ctx));
  }
  st = setInterval(() => {
    t++;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    stars.forEach((item) => item.draw());
    if (t > 100) {
      clearInterval(st);
      shanStar(st, ctx);
    }
  }, 1000);
}
class Star {
  constructor(ctx) {
    this.ctx = ctx;
    let fonts = Math.random() * 5 + 5;
    this.font = `${fonts}px 楷体`;
    this.x = Math.random() * innerWidth;
    this.y = Math.random() * innerHeight;
  }
  draw() {
    let ctx = this.ctx;
    ctx.save();
    let colora = Math.random() * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255,255,255,${colora})`;
    ctx.font = this.font;
    ctx.beginPath();
    ctx.fillText("✬", this.x, this.y);
    ctx.closePath();
    ctx.restore();
  }
}

drawLine();
drawBall();
