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

    const homeWidth =
      document.getElementById("home").offsetWidth;
    const centerBar = document.getElementById("centerBar");
    const rightBar = document.getElementById("rightBar");
    const centerBarWidth =
      homeWidth - newWidth - rightBar.offsetWidth;
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

const closeRightBar = document.querySelector(
  ".closeRightBar"
);

closeRightBar.addEventListener("click", () => {
  rightBar.classList.remove("d-lg-block");
});

const notifications =
  document.getElementById("notifications");

notifications.addEventListener("click", () => {
  rightBar.classList.add("d-lg-block");
});

const volumeInterno =
  document.getElementById("volumeInterno");
const volumeAlto = document.getElementById("volumeAlto");
const volumeMedio = document.getElementById("VolumeMedio");
const volumeBasso = document.getElementById("volumeBasso");
const volumeDisattivato = document.getElementById(
  "volumeDisattivato"
);
const btnVolume = document.getElementById("btnVolume");
// btnVolume.addEventListener("click", () => {
//   volumeDisattivato.classList.remove("d-none");
//   volumeAlto.classList.add("d-none");
//   volumeBasso.classList.add("d-none");
//   volumeMedio.classList.add("d-none");
// });

const onMouseUp = () => {
  document.removeEventListener("mousemove", onMouseMove);
};

// Popolazione album

const myKeyFrancesco =
  "29cd1ae8c9msh33b66faee0e4446p1a9f60jsnb42fe6b9c1f5";
const myKeyGiulio =
  "d470d1fc32mshf7e1a1bbce29cf1p138398jsnd112e2807eda";
const myKeyMarina =
  "2e8b5073f4mshff8ce3300bd3f70p160efajsn3e779e2eda67";
const myKeyCarlo =
  "62aa31e1edmsh5b877960812af61p1c1b11jsncd4891d90e66";
const myKeyFrancesco2 =
  "79ef909c12msh0b593d0b951ee76p1bb51ajsn722c7e7bd3a0";

const findTrack = (url) => {
  fetch(url, {
    headers: {
      "X-RapidAPI-Key": myKeyFrancesco2,
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
      console.log(playlist);
      if (
        !playlist.hasOwnProperty("error") &&
        playlist.tracks.data.length > 5
      ) {
        const randomIndex = Math.floor(
          Math.random() * playlist.tracks.data.length
        );
        const imageTracks =
          playlist.tracks.data[randomIndex].album.cover_big;
        const artistName =
          playlist.tracks.data[randomIndex].artist.name;
        const albumTitle =
          playlist.tracks.data[randomIndex].album.title;

        const annuncio =
          document.getElementById("annuncio");

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
        const preview = new Audio(
          playlist.tracks.data[randomIndex].preview
        );

        const playButton =
          document.querySelector(".playButton");
        playButton.addEventListener("click", () => {
          if (preview.paused) {
            preview.play();
            playButton.innerHTML = "Pause";
          } else {
            preview.pause();
            playButton.innerHTML = "Play";
          }
        });

        const hiddenButton =
          document.querySelector(".hiddenButton");

        hiddenButton.addEventListener("click", () => {
          annuncio.classList.remove("d-lg-flex");
        });
      } else {
        findTrack(
          `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
            Math.random() * 100000
          )}`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const volumeFunction = (audioVolume) => {
  const onMouseMove = (event) => {
    let newWidth =
      event.clientX -
      volumeInterno.getBoundingClientRect().left;
    newWidth = Math.min(newWidth, 75);
    volumeInterno.style.width = newWidth + "px";
    if (newWidth >= 0 && newWidth < 30) {
      volumeDisattivato.classList.add("d-none");
      volumeAlto.classList.add("d-none");
      volumeMedio.classList.add("d-none");
      volumeBasso.classList.remove("d-none");
      audioVolume.volume = 0.25;
    } else if (newWidth > 30 && newWidth < 50) {
      volumeBasso.classList.add("d-none");
      volumeDisattivato.classList.add("d-none");
      volumeAlto.classList.add("d-none");
      volumeMedio.classList.remove("d-none");
      audioVolume.volume = 0.5;
    } else if (newWidth < 0) {
      volumeDisattivato.classList.remove("d-none");
      volumeAlto.classList.add("d-none");
      volumeBasso.classList.add("d-none");
      volumeMedio.classList.add("d-none");
      audioVolume.volume = 0;
    } else {
      volumeMedio.classList.add("d-none");
      volumeBasso.classList.add("d-none");
      volumeDisattivato.classList.add("d-none");
      volumeAlto.classList.remove("d-none");
      audioVolume.volume = 1;
    }
  };
  volumeInterno.addEventListener("mousedown", (event) => {
    event.preventDefault();

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", onMouseUp);
  });
};

const randomizeSongs = [];
let currentAudio = null;

const findPlaylistLeft = (url) => {
  fetch(url, {
    headers: {
      "X-RapidAPI-Key": myKeyMarina,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Richiesta fallita!");
      }
    })
    .then((playlist) => {
      if (
        !playlist.hasOwnProperty("error") &&
        playlist.tracks.data.length > 5
      ) {
        const songs = playlist.tracks.data.slice(0, 10);
        console.log(songs);
        for (let i = 0; i < 4; i++) {
          randomizeSongs.push(...shuffleArray(songs));
        }

        const playlistContainer = document.getElementById(
          "playlistContainer"
        );
        randomizeSongs.forEach((song) => {
          console.log(song);
          const title = song.title;
          const audioUrl = song.preview;
          const titleElement = document.createElement("a");
          titleElement.classList.add(
            "text-decoration-none"
          );
          titleElement.href = "#";
          titleElement.innerHTML = title;
          titleElement.addEventListener(
            "click",
            function (event) {
              event.preventDefault();

              if (
                currentAudio &&
                currentAudio.src === audioUrl
              ) {
                currentAudio.pause();
                currentAudio = null;
              } else {
                if (currentAudio) {
                  currentAudio.pause();
                }
                // qui
                currentAudio = new Audio(audioUrl);
                volumeFunction(currentAudio);
                currentAudio.play();
                const imageTrack =
                  document.getElementById("imageTrack");
                const titleTrack =
                  document.getElementById("songTrack");
                const artistTrack =
                  document.getElementById("artistTrack");
                imageTrack.src = song.album.cover_small;
                titleTrack.innerText = song.title_short;
                artistTrack.innerText = song.artist.name;
                const linkArtist =
                  document.getElementById("linkArtist");
                linkArtist.href = `./artist-page.html?artistPage=${song.artist.id}`;
              }
            }
          );
          playlistContainer.appendChild(titleElement);
        });
      } else {
        findPlaylistLeft(
          `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
            Math.random() * 100000
          )}`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const findAlbumCard = (url) => {
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
    .then((album) => {
      console.log(album);
      if (!album.hasOwnProperty("error")) {
        const imageAlbum = album.picture_big;
        const albumTitle = album.title;
        const albumCreator = album.creator.name;

        const albumCard = document.getElementById("albums");

        const col = document.createElement("div");
        col.classList.add("col", "albumCard");

        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");
        card.style.minHeight = "200px";
        card.style.maxWidth = "200px";

        card.innerHTML = `
        

        <img
        src= ${imageAlbum}
        class="bd-placeholder-img card-img-top"
      />
      <div class="card-body d-flex flex-column justify-content-start align-items-start p-0 mt-2 ms-1">

        <h5 class="card-title w-100">${albumTitle}</h5>

        <p class="card-text text-white-50">
          ${albumCreator}
        </p>
      </div>
        `;
        col.appendChild(card);
        albumCard.appendChild(col);
      } else {
        findAlbumCard(
          `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
            Math.random() * 100000
          )}`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const findAlbumCard2 = (url) => {
  fetch(url, {
    headers: {
      "X-RapidAPI-Key": myKeyCarlo,
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
    .then((album) => {
      console.log(album);
      if (!album.hasOwnProperty("error")) {
        const imageAlbum = album.picture_big;
        const albumTitle = album.title;
        const albumCreator = album.creator.name;

        const albumCard =
          document.getElementById("albums2");

        const col = document.createElement("div");
        col.classList.add("col", "albumCard");

        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");
        card.style.minHeight = "200px";
        card.style.maxWidth = "200px";
        card.innerHTML = `

        <img
        src= ${imageAlbum}
        class="bd-placeholder-img card-img-top"
      />
      <div class="card-body d-flex flex-column justify-content-start align-items-start p-0 mt-2 ms-1">

        <h5 class="card-title w-100">${albumTitle}</h5>

        <p class="card-text text-white-50">
          ${albumCreator}
        </p>
      </div>
        `;
        col.appendChild(card);
        albumCard.appendChild(col);
      } else {
        findAlbumCard2(
          `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
            Math.random() * 100000
          )}`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const findAlbumCard3 = (url) => {
  fetch(url, {
    headers: {
      "X-RapidAPI-Key": myKeyCarlo,
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
    .then((album) => {
      console.log(album);
      if (!album.hasOwnProperty("error")) {
        const imageAlbum = album.picture_big;
        const albumTitle = album.title;
        const albumCreator = album.creator.name;

        const albumCard =
          document.getElementById("albums3");

        const col = document.createElement("div");
        col.classList.add("col", "albumCard");

        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");
        card.style.minHeight = "200px";
        card.style.maxWidth = "200px";
        card.innerHTML = `

        <img
        src= ${imageAlbum}
        class="bd-placeholder-img card-img-top"
      />
      <div class="card-body d-flex flex-column justify-content-start align-items-start p-0 mt-2 ms-1">

        <h5 class="card-title w-100">${albumTitle}</h5>

        <p class="card-text text-white-50">
          ${albumCreator}
        </p>
      </div>
        `;
        col.appendChild(card);
        albumCard.appendChild(col);
      } else {
        findAlbumCard3(
          `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
            Math.random() * 100000
          )}`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = () => {
  findTrack(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );
  findPlaylistLeft(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );

  for (let i = 0; i < 8; i++) {
    findAlbumCard(
      `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
        Math.random() * 100000
      )}`
    );
    findAlbumCard2(
      `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
        Math.random() * 100000
      )}`
    );
    findAlbumCard3(
      `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
        Math.random() * 100000
      )}`
    );
  }
};
backButton.addEventListener("click", function () {
  window.history.back();
});
const forwardButton =
  document.getElementById("forwardButton");

forwardButton.addEventListener("click", function () {
  window.history.forward();
});
