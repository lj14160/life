/* 获取元素 */
/* 因为数量太大所以通过js来创建 */
let lyear = document.querySelector(".l-year");
let lmonth = document.querySelector(".l-month");
let lday = document.querySelector(".l-day");
let lhour = document.querySelector(".l-hour");
let lminute = document.querySelector(".l-minute");
let lsecond = document.querySelector(".l-second");
let lyearSpan = lyear.querySelector("span");
/* 创建时间 倒数第二个参数判断要不要补零*/
create(13, lmonth, "月", false, 1);
create(31, lday, "日", false, 1);
create(24, lhour, "时", true, 0);
create(60, lminute, "分", true, 0);
create(60, lsecond, "秒", true, 0);
/* 立即执行一次 */
timer();
/* 获取当前时间 */
setInterval(timer, 1000);
/* 摆成圆形 */
rot(lsecond, "400px");
rot(lminute, "320px");
rot(lhour, "240px");
rot(lday, "160px");
rot(lmonth, "100px");
/* 函数 */
/* 展示表盘函数 */
function rot(target, distance) {
  var rotBox = target.children;
  for (var i = 0; i < rotBox.length; i++) {
    rotBox[i].style.transform =
      "rotate(" +
      (360 / rotBox.length) * i +
      "deg)" +
      "translateX(" +
      distance +
      ")";
  }
}
/* 创建的元素过多，采用建立文档碎片的方式 */
function create(num, date, target, bool, origin) {
  var fragment = document.createDocumentFragment();
  for (var i = origin; i < num; i++) {
    var j = i;
    if (bool) {
      j = j > 9 ? j : "0" + j;
    }
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(j + target));
    fragment.appendChild(span);
  }
  date.appendChild(fragment);
}
/* 获取时间 */
function timer() {
  var time = new Date();
  var nowYear = time.getFullYear();
  var nowMonth = time.getMonth() + 1;
  var nowDay = time.getDate();
  var nowHour = time.getHours();
  var nowMinute = time.getMinutes();
  var nowSecond = time.getSeconds();
  /* 年份直接填 */
  lyearSpan.innerHTML = nowYear + "年";
  lyearSpan.className = "now";
  /* 旋转 */
  var rotateH = nowHour * 15;
  var rotateM = nowMinute * 6;
  var rotateS = nowSecond * 6;
  var rotateD = (nowDay - 1) * 12;
  var rotateMo = (nowMonth - 1) * 30;
  lsecond.style.transform = "rotate(" + -rotateS + "deg" + ")";
  lminute.style.transform = "rotate(" + -rotateM + "deg" + ")";
  lhour.style.transform = "rotate(" + -rotateH + "deg" + ")";
  lday.style.transform = "rotate(" + -rotateD + "deg" + ")";
  lmonth.style.transform = "rotate(" + -rotateMo + "deg" + ")";
  /* 更改当前时间的样式 */
  clearClass(lmonth);
  clearClass(lday);
  clearClass(lhour);
  clearClass(lminute);
  clearClass(lsecond);
  lmonth.children[nowMonth - 1].className = "now";
  lday.children[nowDay - 1].className = "now";
  lhour.children[nowHour].className = "now";
  lminute.children[nowMinute].className = "now";
  lsecond.children[nowSecond].className = "now";
}
/* 清除样式的函数 */
function clearClass(target) {
  for (var i = 0; i < target.children.length; i++) {
    target.children[i].className = "";
  }
}
