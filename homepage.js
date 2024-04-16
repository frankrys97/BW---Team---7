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

// hiddenButton.addEventListener("click", () => {
//   annuncio.style.display = "none";
// });

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

// Popolazione album

const myKeyFrancesco = "29cd1ae8c9msh33b66faee0e4446p1a9f60jsnb42fe6b9c1f5";
const myKeyGiulio = "d470d1fc32mshf7e1a1bbce29cf1p138398jsnd112e2807eda";
const myKeyMarina = "2e8b5073f4mshff8ce3300bd3f70p160efajsn3e779e2eda67";
const myKeyCarlo = "62aa31e1edmsh5b877960812af61p1c1b11jsncd4891d90e66";

const findPlaylist = (url) => {
  fetch(url, {
    headers: {
      "X-RapidAPI-Key": myKeyFrancesco,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed!");
      }
    })
    .then((playlist) => {
      const imageTracks =
        playlist.tracks.data[
          Math.floor(Math.random() * playlist.tracks.data.length)
        ].album.cover_big;
      const artistName =
        playlist.tracks.data[
          Math.floor(Math.random() * playlist.tracks.data.length)
        ].artist.name;
      const albumTitle =
        playlist.tracks.data[
          Math.floor(Math.random() * playlist.tracks.data.length)
        ].album.title;

      const annuncio = document.getElementById("annuncio");

      annuncio.innerHTML = `
    
    
    
    <div class="col-3">
    <div>
      <img
        src="${imageTracks}"
        alt=""
        class="img-fluid"
        id="imageAnnuncio"
      />
    </div>
  </div>
  <div class="col-6">
    <small>ALBUM</small>

    <h2>${albumTitle}</h2>
    <p>${artistName}</p>
    <p>Ascolta il nuovo singolo di ${artistName}!</p>
    <div class="d-flex gap-2">
      <button
        class="btn playButton rounded rounded-pill px-4 text-black fw-semibold"
      >
        Play
      </button>
      <button
        class="btn saveButton rounded rounded-pill px-4 btn-outline-light"
      >
        Salva
      </button>
      <button class="btn threeDotsButton rounded rounded-pill">
        <i class="bi bi-three-dots"></i>
      </button>
    </div>
  </div>
  <div
    class="col-3 d-flex justify-content-end align-items-start"
    id="hiddenButtonContainer"
  >
    <button
      class="btn text-white-50 rounded rounded-pill py-1 hiddenButton fw-semibold"
      href="#annuncio"
    >
      NASCONDI ANNUNCI
    </button>
  </div>
    
    `;
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = () => {
  findPlaylist(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );
};
