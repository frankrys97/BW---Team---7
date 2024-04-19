const params = new URLSearchParams(window.location.search);
const id = params.get("artistPage");
const q = params.get("queryPage");
let URL =
  "https://deezerdevs-deezer.p.rapidapi.com/artist/412";
if (id) {
  URL =
    "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id;
} else if (q) {
  URL =
    "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
    q;
  console.log(q);
}

let lastPlayerPreview = null;
// variabile mi registra la track premuta in precedenza
const playerBar = (audioVolume) => {
  const volumeInterno =
    document.getElementById("volumeInterno");
  const volumeAlto = document.getElementById("volumeAlto");
  const volumeMedio =
    document.getElementById("VolumeMedio");
  const volumeBasso =
    document.getElementById("volumeBasso");
  const volumeDisattivato = document.getElementById(
    "volumeDisattivato"
  );
  const btnVolume = document.getElementById("btnVolume");
  btnVolume.addEventListener("click", () => {
    volumeDisattivato.classList.remove("d-none");
    volumeAlto.classList.add("d-none");
    volumeBasso.classList.add("d-none");
    volumeMedio.classList.add("d-none");
  });
  btnVolume.addEventListener("click", () => {
    volumeDisattivato.classList.add("d-none");
    volumeAlto.classList.add("d-none");
    volumeBasso.classList.remove("d-none");
    volumeMedio.classList.add("d-none");
  });

  volumeInterno.addEventListener("mousedown", (event) => {
    event.preventDefault();

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", onMouseUp);
  });

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

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };
};

// fino a qui la funzione del volume e del movimento della pagina
const myKeyMarina =
  "2e8b5073f4mshff8ce3300bd3f70p160efajsn3e779e2eda67";
const findArtist = () => {
  fetch(URL, {
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
        throw new Error("Request failed!");
      }
    })
    .then((artist) => {
      console.log(artist);
      const imageCopertina = document.getElementById(
        "imageCopertina"
      );
      const numeroFan =
        document.getElementById("numeroFan");
      numeroFan.innerText = artist.nb_fan;
      imageCopertina.style = `background-image: url(${artist.picture_xl})`;
      const imageArtist =
        document.getElementById("imgArtist");
      const imageLike = document.getElementById(
        "imageBraniLike"
      );
      const nomeArtista2 =
        document.getElementById("nomeArtista2");
      nomeArtista2.innerText = artist.name;
      imageLike.src = artist.picture_small;
      imageArtist.src = artist.picture_small;
      const containerTitle =
        document.getElementById("containerName");

      containerTitle.innerHTML = `<h3 class="mb-0 d-none d-lg-inline-block">Artista verificato</h3>
<h1 class="display-2 mb-0">${artist.name}</h1>
<p class="mt-0 fs-5 d-none d-lg-inline-block"><span>${artist.nb_fan}</span> ascoltatori mansili</p>`;

      const nomeArtista =
        document.getElementById("nomeArtista");

      nomeArtista.innerText = artist.name;

      console.log(artist.tracklist);

      console.dir(imageCopertina);
      console.log(artist.picture_xl);

      const urlTralist = id
        ? `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`
        : `https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=10`;

      fetch(urlTralist, {
        headers: {
          "X-RapidAPI-Key": myKeyMarina,
          "X-RapidAPI-Host":
            "deezerdevs-deezer.p.rapidapi.com",
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
        .then((tracklist) => {
          console.log(tracklist);

          const containerTrack = document.getElementById(
            "containerTrack"
          );

          tracklist.data.forEach((track) => {
            console.log(track);
            const preview = new Audio(track.preview);
            volumeFunction(preview);

            // per implementare nell'album devi creare questo
            const elList = document.createElement("li");
            elList.classList.add(
              "list-group-item",
              "d-flex",
              "justify-content-between",
              "align-items-center",
              "border-0",
              "container-fluid",
              "py-3",
              "h-auto",
              "w-100",
              "list-group-item-action"
            );
            containerTrack.appendChild(elList);
            const containerImage =
              document.createElement("button");
            containerImage.classList.add(
              "mx-3",
              "h-25",
              "w-25",
              "btn"
            );
            containerImage.appendChild(preview);
            console.log(track.artist.name);

            const playButton =
              document.getElementById("pauseButton");

            containerImage.addEventListener("click", () => {
              if (
                preview.paused ||
                preview.src !== preview.src
              ) {
                if (
                  lastPlayerPreview &&
                  lastPlayerPreview !== preview
                ) {
                  lastPlayerPreview.pause();
                }
                preview.play();
                lastPlayerPreview = preview;
              } else {
                preview.pause();
              }
              // condizione che prevede lo stop della canzone precedentemente cliccata
              const imagePlayer =
                document.getElementById("imgPlayer");
              const songPlayer =
                document.getElementById("songPlayer");
              const artistPlayer =
                document.getElementById("artistPlayers");
              imagePlayer.src =
                track.contributors[0].picture_small;
              songPlayer.innerText = track.title_short;
              artistPlayer.innerText = track.artist.name;
            });
            playButton.addEventListener("click", () => {
              if (preview.paused) {
                preview.play();
              } else {
                preview.pause();
              }
            });
            console.log(playButton);

            const imageTrack =
              document.createElement("img");

            imageTrack.classList.add("img-fluid");
            containerImage.appendChild(imageTrack);
            imageTrack.src =
              track.contributors[0].picture_small;
            const titleTrackContainer =
              document.createElement("div");
            titleTrackContainer.classList.add("mx-3");
            const titleTrack = document.createElement("p");
            titleTrack.classList.add("fw-bold");
            titleTrack.innerText = track.title_short;
            titleTrackContainer.appendChild(titleTrack);
            const rankTrack2 = document.createElement("p");
            titleTrackContainer.appendChild(rankTrack2);
            rankTrack2.innerText = track.rank;
            rankTrack2.classList.add("d-lg-none");
            titleTrackContainer.classList.add(
              "d-flex",
              "flex-column",
              "align-items-center"
            );
            const rankTrackContainer =
              document.createElement("div");
            rankTrackContainer.classList.add(
              "mx-3",
              "d-none",
              "d-lg-block"
            );
            const btnSettings =
              document.createElement("button");
            btnSettings.innerHTML = `<i class="bi bi-three-dots-vertical"></i>`;
            btnSettings.classList.add("btn", "d-lg-none");
            const rankTrack = document.createElement("p");
            rankTrack.classList.add("fw-bold");
            rankTrack.innerText = track.rank;
            rankTrackContainer.appendChild(rankTrack);
            const durationTrackContainer =
              document.createElement("div");
            durationTrackContainer.classList.add(
              "mx-3",
              "d-none",
              "d-lg-block"
            );
            const durationTrack =
              document.createElement("p");
            durationTrack.classList.add("fw-bold");
            durationTrack.innerText = track.duration;
            durationTrackContainer.appendChild(
              durationTrack
            );
            elList.append(
              containerImage,
              titleTrackContainer,
              rankTrackContainer,
              durationTrackContainer,
              btnSettings
            );
            const album = document.getElementById("album");
            const col = document.createElement("div");
            album.appendChild(col);
            col.classList.add("col", "gy-3");
            const card = document.createElement("div");
            card.classList.add("card");
            card.style = "height: 350px";
            const img = document.createElement("img");
            img.src = track.album.cover_medium;
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const cardTitle = document.createElement("div");
            const ancora = document.createElement("a");
            const titleCard = document.createElement("h5");
            titleCard.innerText = track.album.title;
            ancora.appendChild(titleCard);
            ancora.classList.add(
              "link-underline",
              "link-underline-opacity-0"
            );
            ancora.href = `./album.html?albumPage=${track.album.id}`;

            cardTitle.appendChild(ancora);
            cardBody.appendChild(cardTitle);
            card.append(img, cardBody);
            col.appendChild(card);

            const collab =
              document.getElementById("collab");
            track.contributors.forEach((collaboration) => {
              const col2 = document.createElement("div");
              collab.appendChild(col2);
              col2.classList.add("col", "gy-3");
              const card2 = document.createElement("div");
              card2.classList.add("card");
              card2.style = "height: 300px";
              const img2 = document.createElement("img");
              img2.src = collaboration.picture_medium;
              img2.classList.add("rounded-circle");
              const cardBody2 =
                document.createElement("div");
              cardBody2.classList.add("card-body");
              const cardTitle2 =
                document.createElement("div");
              const ancora = document.createElement("a");
              const titleCard2 =
                document.createElement("h5");
              ancora.appendChild(titleCard2);
              ancora.classList.add(
                "link-underline",
                "link-underline-opacity-0"
              );
              ancora.href = `./artist-page.html?artistPage=${collaboration.id}`;
              titleCard2.innerText = collaboration.name;
              cardTitle2.appendChild(ancora);
              cardBody2.appendChild(cardTitle2);
              card2.append(img2, cardBody2);
              col2.appendChild(card2);
            });
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
findArtist();
const randomizeSongs = [];

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
        throw new Error("Request failed!");
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
          const title = song.title;
          const titleElement = document.createElement("a");
          titleElement.classList.add(
            "text-decoration-none"
          );
          titleElement.href = `#`;
          titleElement.innerHTML = title;
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

window.onload = () => {
  findPlaylistLeft(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );
  fetch(URL, {
    headers: {
      "X-RapidAPI-Key": myKeyMarina,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })

    .catch((err) => console.log(err));

  findPlaylistLeft(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );
};
