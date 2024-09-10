function get(some) {
  return document.querySelector(some);
}
let clock = get(".clock");
let ul = get(".ulke");
let ke = get(".ke");
let mon = get(".mon");
let dat = get(".dat");
let hour = get(".hour");
let min = get(".min");
let sec = get(".sec");
let body = get("body");
let time = get(".time");
let fa = get(".fa");
let yuan = get(".yuan");
let life = get(".life");
let bgcImg = [
  "url(./img/1.jpg)",
  "url(./img/2.jpg)",
  "url(./img/3.jpg)",
  "url(./img/5.jpg)",
  "url(./img/6.jpg)",
];
for (var i = 1; i < 60; i++) {
  let newli = document.createElement("span");
  let x = i * 6 + "deg";
  if (i % 5 === 0) {
    newli.style.height = "15px";
    newli.style.backgroundColor = "red";
  }
  newli.style.transform = `rotate(${x})`;
  fa.appendChild(newli);
}
setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let month = date.getMonth() + 1;
  let dateT = date.getDate();
  let index = Math.round(Math.random() * 6);
  if (s == 0) {
    clock.style.backgroundImage = bgcImg[index];
  }
  let hdeg = h * 30 + "deg";
  let mdeg = m * 6 + "deg";
  let sdeg = s * 6 + "deg";
  let hh = h < 10 ? "0" + h : h;
  let mm = m < 10 ? "0" + m : m;
  let ss = s < 10 ? "0" + s : s;
  let nowTime = `${hh}:${mm}:${ss}`;

  fa.children[s].classList.add("addClass");
  setTimeout(() => {
    fa.children[s].classList.remove("addClass");
  }, 1000);
  hour.style.transform = `rotate(${hdeg})`;
  min.style.transform = `rotate(${mdeg})`;
  sec.style.transform = `rotate(${sdeg})`;
  time.innerHTML = nowTime;
  mon.innerHTML = month;
  dat.innerHTML = dateT;
}, 1000);

//设置搜索框
let sword = get(".sword");
let sul = get(".ul");
sword.addEventListener("keyup", (e) => {
  let en = e || window.event;
  if (sword.value) {
    //创建script标签 并设置回调函数 download 连接跨域
    let script = document.createElement("script");
    script.src = `http://suggestion.baidu.com/su?wd=${sword.value}&cb=download`;
    document.body.append(script);
  } else {
    sul.innerHTML = "";
  }
});
//回车搜索
sword.addEventListener("keyup", function (e) {
  let en = e || window.event;
  if (sword.value && en.keyCode === 13) {
    window.open(`http://wwww.baidu.com/s?wd=${sword.value}`);
  }
});
let book = get(".book");
let fan = get(".fan");

let word = get(".word");
for (var i = 1; i <= 10; i++) {
  let wli = document.createElement("li");
  let ye = document.querySelectorAll(".ye");
  wli.innerHTML = ye[i].textContent;
  word.appendChild(wli);
}
let times = 0;

let lifeTime = setInterval(() => {
  let wordOffsetTop = word.offsetTop;
  word.style.top = word.offsetTop - 40 + "px";
  word.style.color = "black";
  for (var i = 0; i < 10; i++) {
    word.children[i].style.color = "rgba(10,0,0,0)";
  }
  if (times == 10) {
    word.style.top = 0 + "px";
    times = 0;
  }
  word.children[times].style.color = "white";
  times++;
}, 2000);

let leftWord = [
  "人生到处知何似 应似飞鸿踏雪泥",
  "大道如青天，我独不得出",
  "年少而不可得之物，终会困他一生",
  "写尽天下太平事，不敢俯首看人间",
  "最是人间留不住,朱颜辞镜花辞树",
];

setInterval(() => {
  let index = Math.floor(Math.random() * leftWord.length);
  life.innerHTML = leftWord[index];
}, 6000);
