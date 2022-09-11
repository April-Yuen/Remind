const hamburger = document.querySelector("#hamburger")
const drawer = document.querySelector("#drawer")
const overlay = document.querySelector("#overlay");


hamburger.addEventListener("click", () => {
    const isSlideOverClosed = drawer.classList.contains("-left-96");
    
    if (isSlideOverClosed) {
      openSlideOver();
    } else {
      closeSlideOver();
    }
})

overlay.addEventListener("click", () => {
  closeSlideOver();
});

const closeSlideOver = () => {
  drawer.classList.remove("left-0");
  drawer.classList.add("-left-96");
  overlay.classList.add("hidden");
}

const openSlideOver = () => {
  drawer.classList.remove("-left-96");
  drawer.classList.add("left-0");
  overlay.classList.remove("hidden");
}
