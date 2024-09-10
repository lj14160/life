function canvas() {
  var canvas = document.getElementById("can");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // 创建一个对象
  var ctx = canvas.getContext("2d");
  let pointArr = [
    { x: 0, y: 0 },
    { x: window.innerWidth, y: 0, z: 1 },
  ];
  async function p() {
    let length = pointArr.length;
    let pat = Math.floor(Math.random() * length);
    // let po = pointArr.shift();
    let po = pointArr[pat];
    pointArr.splice(pat, 1);
    let np1 = nextP(po),
      np2 = nextP(po);

    time % 11 == 0 ? pointArr.push(np1, np2) : pointArr.push(np1);

    drawline(po, np1);
    drawline(po, np2);

    await wait();
  }
  let baseL = 20;
  function nextP(d) {
    let x = d.x,
      y = d.y;
    // let nx = x + (Math.random() * baseL + 1) * Math.cos(Math.random() * Math.PI);
    let cx = 0;
    if (d.z) {
      cx = -(Math.random() * baseL + 1);
    } else {
      cx = Math.random() * baseL + 1;
    }
    let nx = x + cx;
    // let nx = x + Math.random() * baseL + 1
    let ny = y + Math.random() * baseL + 1;
    let nz = d.z ? 1 : 0;
    // let ny = y + (Math.random() * baseL + 1) * Math.cos(Math.random() * Math.PI);
    return {
      x: nx,
      y: ny,
      z: nz,
    };
  }

  function drawline(p1, p2) {
    ctx.save();
    ctx.beginPath();
    // ctx.fillStyle = '#fff'
    ctx.strokeStyle = "#aaa";
    // ctx.fillStyle = '#' + Math.random().toString(16).substr(-6)
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  let time = 0;

  async function start() {
    while (time < 200) {
      await p();

      time++;
    }
    time = 0;

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    let x1 =
      Math.random() * innerWidth > innerWidth / (Math.random() * 2 + 1)
        ? Math.random() * innerWidth
        : 0;
    let y1 = x1 == 0 ? Math.random() * innerHeight : 0;

    let x2 =
      Math.random() * innerWidth > innerWidth / (Math.random() * 2 + 1)
        ? Math.random() * innerWidth
        : 0;
    let y2 = x2 == 0 ? Math.random() * innerHeight : 0;

    pointArr = [
      { x: x1, y: y1 },
      { x: x2, y: y2, z: 1 },
    ];
    start();
  }

  function wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000 / 60);
    });
  }
  let gsInter = null;
  start();
  writeWord();
  function writeWord() {
    let gsinp = document.querySelector(".gs-inp");
    let gsvalue = "y = Math.sin(x) * 300 + (innerHeight - 400)";
    //回车搜索
    gsinp.addEventListener("keyup", function (e) {
      let en = e || window.event;
      gsvalue = en.target.value;
      if (gsvalue && en.keyCode === 13) {
        gsinp.blur();
        try {
          //   clearInterval(gsInter);
          ctx.clearRect(0, 0, innerWidth, innerHeight);
          drawgj(en.target.value);
          let tip = document.querySelector(".tip");
          tip.style.display = "block";
          let st = setTimeout(() => {
            clearTimeout(st);
            tip.style.display = "none";
          }, 6000);
        } catch (e) {
          clearInterval(gsInter);
        }
      }
    });
    gsinp.onfocus = function (e) {
      if (e.target.value.trim() === "") {
        e.target.value = gsvalue;
      }
    };
    drawgj(gsvalue);
  }

  window.lifelive = {
    textStyle: "#fff",
    text: "人生",
    time: 500,
    font: "18px 楷体",
  };
  function drawgj(gsvalue) {
    let ggs = gsvalue;
    gsInter && clearInterval(gsInter);
    let hisArr = [];
    let x = 50;
    gsInter = setInterval(() => {
      hisArr.length > 0 &&
        ctx.clearRect(
          hisArr[0] - 20,
          hisArr[1] - 20,
          40 * lifelive.text.length,
          50
        );
      ctx.save();
      ctx.beginPath();
      x = x > innerWidth - 50 ? 50 : x + 50;
      ctx.font = lifelive.font;
      ctx.fillStyle = lifelive.textStyle;
      let y = 0;
      eval(ggs);
      hisArr = [x, y];
      ctx.fillText(lifelive.text, x, y);
      ctx.restore();
    }, 500);
  }

  window.onerror = (e) => {
    console.error(e);
    clearInterval(gsInter);
    alert("待从头、收拾旧山河，朝天阙");
    // location.reload();
  };
}
canvas();
