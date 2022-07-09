
window.onscroll = function() {scrollstick()};
let navbar = document.querySelector("#nav-bar");

let scrollStick = navbar.offsetTop;

function scrollstick() {
  if (window.pageYOffset > scrollStick) {
    navbar.classList.add("scrollstick")
    

  } else {
    navbar.classList.remove("scrollstick")
  }
} 