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

const leftBar = document.getElementById("leftBar");
const rightBar = document.getElementById("rightBar");
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

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const assignRandomColor = () => {
  const searchCard =
    document.querySelectorAll(".searchCard");

  searchCard.forEach((card) => {
    card.style.backgroundColor = randomColor();
  });
};

assignRandomColor();

const dragHandle = document.getElementById("dragHandle");

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

const selectType = document.getElementById("selectType");
const searchButton =
  document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");
const searchForm = document.getElementById("searchForm");

selectType.addEventListener("change", () => {
  const selectedValue = selectType.value;
  if (selectedValue !== "") {
    searchButton.disabled = false;
    searchBar.disabled = false;
  } else {
    searchButton.disabled = true;
    searchBar.disabled = true;
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchBar.value;
  const selectedType = selectType.value;
  if (selectedType === "artist") {
    const url =
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
      query;

    fetch(url, {
      headers: {
        "X-RapidAPI-Key": myKeyFrancesco,
        "X-RapidAPI-Host":
          "deezerdevs-deezer.p.rapidapi.com",
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
      .then((data) => {
        const artistID = data.data[0].artist.id;
        window.location.href = `./artist-page.html?artistPage=${artistID}`;
      });

    selectType.value = "";
  } else if (selectedType === "album") {
    window.location.href = `./album.html?QueryPage=${query}`;
    selectType.value = "";
  }
});

const myKeyFrancesco =
  "29cd1ae8c9msh33b66faee0e4446p1a9f60jsnb42fe6b9c1f5";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
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
const playStop = (traccia) => {
  const playButton = document.getElementById("pauseButton");
  playButton.addEventListener("click", () => {
    const playBtn = document.getElementById("buttonPlay");
    const pauseBtn = document.getElementById("buttonPause");
    // preview.pause();
    console.log(traccia.paused);
    if (traccia.paused) {
      traccia.play();
      playBtn.classList.add("d-none");
      pauseBtn.classList.remove("d-none");
    } else {
      playBtn.classList.remove("d-none");
      pauseBtn.classList.add("d-none");
      traccia.pause();
    }
  });
};
const randomizeSongs = [];
let currentAudio = null;

const findPlaylistLeft = (url) => {
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
                currentAudio = new Audio(audioUrl);
                volumeFunction(currentAudio);
                playStop(currentAudio);
                currentAudio.play();
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

window.onload = () => {
  findPlaylistLeft(
    `https://deezerdevs-deezer.p.rapidapi.com/playlist/${Math.floor(
      Math.random() * 100000
    )}`
  );
};
backButton.addEventListener("click", function () {
  window.history.back();
});
const forwardButton =
  document.getElementById("forwardButton");

forwardButton.addEventListener("click", function () {
  window.history.forward();
});
