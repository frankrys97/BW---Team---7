const params = new URLSearchParams(window.location.search);
const id = params.get("albumPage");
const q = params.get("QueryPage");
let URL =
  "https://deezerdevs-deezer.p.rapidapi.com/album/6966025";
if (id) {
  URL =
    "https://deezerdevs-deezer.p.rapidapi.com/album/" + id;
} else if (q) {
  URL =
    "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
    q;
}

const myKeyFrancesco =
  "29cd1ae8c9msh33b66faee0e4446p1a9f60jsnb42fe6b9c1f5";
const myKeyGiulio =
  "d470d1fc32mshf7e1a1bbce29cf1p138398jsnd112e2807eda";
const myKeyMarina =
  "2e8b5073f4mshff8ce3300bd3f70p160efajsn3e779e2eda67";
const myKeyCarlo =
  "62aa31e1edmsh5b877960812af61p1c1b11jsncd4891d90e66";

const findAlbum = (url) => {
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": myKeyGiulio,
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
    .then((data) => {
      if (url.includes("/search?q=")) {
        const albumId = data.data[0].album.id;
        findAlbum(
          `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`
        );
      } else {
        const imageAlbum = data.cover_big;
        const imageAlbumMobile = data.cover_medium;
        const artistName = data.artist.name;
        const albumTitle = data.title;
        const releaseDate = data.release_date;
        const trackCount = data.nb_tracks;
        const urlTrackList = data.tracklist;
        const idArtist = data.artist.id;

        const containerAlbum = document.getElementById(
          "containerAlbum"
        );
        containerAlbum.innerHTML = `<div class="row">
        <div class="col-md-2 col-12 d-flex justify-content-center p-0 ">
          <img src="${imageAlbum}" class="img-fluid d-none d-md-flex mx-4 " alt="Album Image"/>
          <img src="${imageAlbumMobile}" class="img-fluid d-md-none mt-5" alt="Album Image"/>
        </div>
        <div class="col-md-10 col-12 d-flex flex-column">
          <div class="mt-auto mb-0 d-md-block d-none">Album</div>
          <h1 class="mt-4 ">${albumTitle}</h1>
          <p class="mb-0 d-none d-md-block ">${artistName} • ${releaseDate} • ${trackCount} Brani</p>
          <p class="mb-2 d-md-none ">${artistName}</p>
          <p class="mb-0 d-md-none "> Album • ${releaseDate} </p>
        </div>
      </div>`;
        updateBackgroundGradient(imageAlbum);
        createTrackList(
          `https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtist}/top?limit=${trackCount}`
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching album:", error);
    });
};

let currentPreview = null;

const createTrackList = (urlTrack) => {
  fetch(urlTrack, {
    headers: {
      "X-RapidAPI-Key": myKeyGiulio,
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
    .then((data) => {
      const containerTrack = document.getElementById(
        "containerTrack"
      );
      let htmlContent = "";
      let counter = 1;

      data.data.forEach((track) => {
        const trackTitle = track.title;
        const trackArtistName = track.artist.name;
        const trackDuration = divideTime(track.duration);
        // const trackPosition = track.track_position;
        const trackStreaming = track.rank;
        const artistId = track.artist.id;
        const previewSong = track.preview;

        htmlContent += `
        <div class="row px-2 me-4 d-none d-md-flex">
        <div class="col-6">
          <div class="d-flex align-items-center">
            <div class="p-2">
              <span class="song-number text-body-tertiary d-none d-md-block">${counter}</span>
            </div>
            <div class="p-2">
              <div class="song-info">
                <div class="song-text"><h5  data-preview="${previewSong}">${trackTitle}</h5></div>
                <div class="song-artist text-body-tertiary">
                <a href="./artist-page.html?artistPage=${artistId}"><p>${trackArtistName}</p></a>                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-3 d-flex align-items-center justify-content-end"
        >
          <p class="text-body-tertiary d-none d-md-block">${trackStreaming}</p>
        </div>
        <div
          class="col-3 d-flex align-items-center justify-content-end"
        >
          <p class="text-end text-body-tertiary d-none d-md-block">${trackDuration}</p>
        </div>
      </div>
      <div class="row me-2 d-md-none">
      <div class="d-flex justify-content-between p-0 my-1">
        <div class="d-flex align-items-center">
          <div class="p-2">
            <div class="song-info">
              <div class="song-text">
                <h5 class="mb-0 fs-5" data-preview="${previewSong}">${trackTitle}</h5>
              </div>
              <div class="song-artist text-body-tertiary">
                <p>${trackArtistName}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg>
        </div>
      </div>
    </div>
      
      `;
        counter++;
      });
      containerTrack.innerHTML = htmlContent;
      const trackElements =
        document.querySelectorAll(".song-info");
      trackElements.forEach((trackElement, index) => {
        trackElement.addEventListener("click", () => {
          // Per l'elemento audio cliccato mi vado a creare un oggetto di tipo audio andandomi a prendere
          // l'url dall'oggetto data
          const preview = new Audio(
            data.data[index].preview
          );

          // Qui ho impostato una condizione globale dove vado a verificare se esiste la currentPreview e se il suo
          // valore corrisponde all'elemento audio cliccato, in caso affermativo, controlla se il currentPreview è in pausa o in riproduzione
          // altrimenti vado nell'else dove dico che se la traccia cliccata è diversa dalla traccia corrente,
          //interrompi la traccia corrente e avvia la nuova traccia

          if (
            currentPreview &&
            currentPreview.src === preview.src
          ) {
            if (currentPreview.paused) {
              currentPreview.play();
            } else {
              currentPreview.pause();
            }
          } else {
            if (currentPreview) {
              currentPreview.pause();
            }

            preview.play();
            currentPreview = preview;
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching track list:", error);
    });
};
function divideTime(seconds) {
  const duration = seconds.toString();
  if (duration.length === 3) {
    return `${duration.charAt(0)}:${duration.substring(1)}`;
  }
  return duration;
}

window.onload = () => {
  findAlbum(URL);
  findPlaylistLeft(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );
};
const updateBackgroundGradient = (imageUrl) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageUrl;
  img.onload = () => {
    const colorThief = new ColorThief();
    try {
      const palette = colorThief.getPalette(img, 2);
      const centerBar =
        document.getElementById("centerBar");

      centerBar.style.background = `linear-gradient(0deg, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(0, 0, 0, 1) 49%, 
        rgba(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}, 1) 75%, 
        rgba(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}, 1) 100%)`;
    } catch (error) {
      console.error("Error extracting colors", error);
    }
  };
};

// apparat artId 6069 AlbumId 6966025
// moderat artId 275723 AlbumId 61295392

const randomizeSongs = [];

const findPlaylistLeft = (url) => {
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

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.history.back();
});
const forwardButton =
  document.getElementById("forwardButton");

forwardButton.addEventListener("click", function () {
  window.history.forward();
});
