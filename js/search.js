function queryEl(el) {
  return document.body.querySelector(el);
}

let navs = queryEl(".s-nav");
let bddiv = queryEl(".bd");
let gsdiv = queryEl(".gs");
let jbdiv = queryEl(".jb");
let texInp = queryEl(".tex");

navs.addEventListener("click", function (e) {
  let target = e.target;
  let dataId = target.getAttribute("data-id");
  let child = [...navs.children];
  child.forEach((el) => {
    let id = el.getAttribute("data-id");
    if (id == dataId) {
      el.classList.add("s-active");
      queryEl("." + id).style.display = "block";
    } else {
      el.classList.remove("s-active");
      queryEl("." + id).style.display = "none";
    }
  });
});

// texInp.addEventListener("keyup", function (e) {});
texInp.onblur = function (e) {
  let en = e || window.event;
  let fnstr = en.target.value;
  if (fnstr) {
    let fnstr = en.target.value;
    try {
      let fn = new Function(fnstr);
      fn();
    } catch (error) {
      console.log(error);
    }
  }
};
