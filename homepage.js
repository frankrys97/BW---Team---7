const dragHandle = document.getElementById("dragHandle");
const leftBar = document.getElementById("leftBar");
const rightBar = document.getElementById("rightBar");
let isResizing = false;
let lastX;
const maxLeftBarWidth = 700;
const rightTreshhold = 600;

dragHandle.addEventListener("mousedown", (e) => {
  isResizing = true;
  lastX = e.clientX;
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  console.log(isResizing);

  const delta = e.clientX - lastX;
  const newWidth = leftBar.offsetWidth + delta;

  const minWidth = 200;
  if (newWidth >= minWidth && newWidth <= maxLeftBarWidth) {
    leftBar.style.width = `${newWidth}px`;

    const homeWidth = document.getElementById("home").offsetWidth;
    const centerBar = document.getElementById("centerBar");
    const rightBar = document.getElementById("rightBar");
    const centerBarWidth = homeWidth - newWidth - rightBar.offsetWidth;
    centerBar.style.width = `${centerBarWidth}px`;

    if (newWidth >= rightTreshhold) {
      rightBar.style.display = "none";
    } else {
      rightBar.style.display = "block";
    }
  }

  lastX = e.clientX;
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  console.log(isResizing);
});

const closeRightBar = document.querySelector(".closeRightBar");

closeRightBar.addEventListener("click", () => {
  rightBar.style.display = "none";
});

const notifications = document.getElementById("notifications");

notifications.addEventListener("click", () => {
  rightBar.style.display = "block";
});


const hiddenButton = document.querySelector(".hiddenButton");
const annuncio = document.getElementById("annuncio");

hiddenButton.addEventListener("click", () => {
  annuncio.style.display = "none";
})
