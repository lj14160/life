let t2 = document.querySelector(".t2");
let t2body = document.querySelector(".body");
let yue = document.querySelector(".yue");
let io = new IntersectionObserver(
  (data) => {
    if (data[0].boundingClientRect.top == 0) {
      yue.style.display = "block";
    } else {
      yue.style.display = "none";
    }
  },
  { root: t2body, threshold: [0, 1] }
);
io.observe(t2);
