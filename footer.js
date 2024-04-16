const volumeInterno = document.getElementById("volumeInterno");
const volumeAlto = document.getElementById("volumeAlto");
const volumeMedio = document.getElementById("VolumeMedio");
const volumeBasso = document.getElementById("volumeBasso");
const volumeDisattivato = document.getElementById("volumeDisattivato");
const btnVolume = document.getElementById("btnVolume");
// btnVolume.addEventListener("click", () => {
//   volumeDisattivato.classList.remove("d-none");
//   volumeAlto.classList.add("d-none");
//   volumeBasso.classList.add("d-none");
//   volumeMedio.classList.add("d-none");
// });

volumeInterno.addEventListener("mousedown", (event) => {
  event.preventDefault();

  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener("mouseup", onMouseUp);
});

const onMouseMove = (event) => {
  let newWidth = event.clientX - volumeInterno.getBoundingClientRect().left;
  newWidth = Math.min(newWidth, 75);
  volumeInterno.style.width = newWidth + "px";
  if (newWidth >= 0 && newWidth < 30) {
    volumeDisattivato.classList.add("d-none");
    volumeAlto.classList.add("d-none");
    volumeMedio.classList.add("d-none");
    volumeBasso.classList.remove("d-none");
  } else if (newWidth > 30 && newWidth < 50) {
    volumeBasso.classList.add("d-none");
    volumeDisattivato.classList.add("d-none");
    volumeAlto.classList.add("d-none");
    volumeMedio.classList.remove("d-none");
  } else if (newWidth < 0) {
    volumeDisattivato.classList.remove("d-none");
    volumeAlto.classList.add("d-none");
    volumeBasso.classList.add("d-none");
    volumeMedio.classList.add("d-none");
  } else {
    volumeMedio.classList.add("d-none");
    volumeBasso.classList.add("d-none");
    volumeDisattivato.classList.add("d-none");
    volumeAlto.classList.remove("d-none");
  }
};

const onMouseUp = () => {
  document.removeEventListener("mousemove", onMouseMove);
};
