AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

function castParallax() {
  window.addEventListener("scroll", function () {
    let top = this.scrollY;

    let layers = document.getElementsByClassName("parallax");
    let layers50 = document.getElementsByClassName("parallax50");
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i];
      let speed = layer.getAttribute("data-speed");
      let yPos = -((top * speed) / 100);
      layer.setAttribute(
        "style",
        "transform: translate3d(0px, " + yPos + "px, 0px)"
      );
    }
    for (let i = 0; i < layers50.length; i++) {
      let layer = layers50[i];
      let speed = layer.getAttribute("data-speed");
      let yPos = -((top * speed) / 100);
      layer.setAttribute(
        "style",
        "transform: translate3d(-50%, " + yPos + "px, 0px)"
      );
    }
  });
}

document.body.onload = castParallax();

window.onload = function () {
  let title = document.querySelector(".title-name");

  title.style.transition = "4s";
  title.style.opacity = 1;
  title.style.transform = "none";
};

//
// ---Retro Button---
//
let buttons = document.querySelectorAll(".btn");

for (let i = 0; i < buttons.length; i++) {
  // Click
  buttons[i].addEventListener("mousedown", function () {
    this.classList.add("btn-active");
  });
  buttons[i].addEventListener("mouseup", function () {
    this.classList.remove("btn-active");
  });

  // Hover
  buttons[i].addEventListener("mouseleave", function () {
    this.classList.remove("btn-center", "btn-right", "btn-left", "btn-active");
  });

  buttons[i].addEventListener("mousemove", function (e) {
    let leftOffset = this.getBoundingClientRect().left;
    let btnWidth = this.offsetWidth;
    let myPosX = e.pageX;
    let newClass = "";
    // if on left 1/3 width of btn
    if (myPosX < leftOffset + 0.3 * btnWidth) {
      newClass = "btn-left";
    } else {
      // if on right 1/3 width of btn
      if (myPosX > leftOffset + 0.65 * btnWidth) {
        newClass = "btn-right";
      } else {
        newClass = "btn-center";
      }
    }
    // remove prev class
    let clearedClassList = this.className
      .replace(/btn-center|btn-right|btn-left/gi, "")
      .trim();
    this.className = clearedClassList + " " + newClass;
  });
}
