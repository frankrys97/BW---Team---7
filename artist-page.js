const params = new URLSearchParams(window.location.search);
const id = params.get("artistPage");
const URL = id
  ? "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id
  : "https://deezerdevs-deezer.p.rapidapi.com/artist/412";

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
const myKeyMarina = "2e8b5073f4mshff8ce3300bd3f70p160efajsn3e779e2eda67";
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
      const imageCopertina = document.getElementById("imageCopertina");
      imageCopertina.style = `background-image: url(${artist.picture_xl})`;
      const containerTitle = document.getElementById("containerName");
      containerTitle.innerHTML = `<h3 class="mb-0">Artista verificato</h3>
<h1 class="display-2 mb-0">${artist.name}</h1>
<p class="mt-0 fs-5"><span>${artist.nb_fan}</span> ascoltatori mansili</p>`;
      const nomeArtista = document.getElementById("nomeArtista");

      nomeArtista.innerText = artist.name;

      //       imageCopertina.innerHTML = `
      // <div class="card text-bg-dark">
      //   <img src="${artist.picture_xl}" class="card-img" alt="...">
      //   <div class="card-img-overlay">
      //     <h5 class="card-title">${artist.name}</h5>

      //   </div>
      // </div>`;

      console.log(artist.tracklist);
      //   imageCopertina.style.backgroundImage(artist.picture_big);
      console.dir(imageCopertina);
      console.log(artist.picture_xl);

      const urlTralist = id
        ? `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`
        : "https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=10";
      fetch(urlTralist, {
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
        .then((tracklist) => {
          console.log(tracklist);
          tracklist.data.forEach((track) => {
            console.log(track.title_short);
            const listTrack = document.getElementById("listTrack");
            const elList = document.createElement("li");
            elList.classList.add(
              "list-group-item",
              "d-flex",
              "justify-content-between",
              "align-items-center",
              "border-0",
              "container-fluid",
              "my-0",
              "h-auto"
            );
            listTrack.appendChild(elList);
            const containerImage = document.createElement("div");
            containerImage.classList.add("mx-3", "h-25", "w-25");
            const imageTrack = document.createElement("img");
            imageTrack.classList.add("img-fluid");
            containerImage.appendChild(imageTrack);
            imageTrack.src = track.contributors[0].picture_small;
            const titleTrackContainer = document.createElement("div");
            titleTrackContainer.classList.add("ms-2", "me-auto");
            const titleTrack = document.createElement("p");
            titleTrack.classList.add("fw-bold");
            titleTrack.innerText = track.title_short;
            titleTrackContainer.appendChild(titleTrack);
            const rankTrackContainer = document.createElement("div");
            rankTrackContainer.classList.add("ms-2", "me-auto");
            const rankTrack = document.createElement("p");
            rankTrack.classList.add("fw-bold");
            rankTrack.innerText = track.rank;
            rankTrackContainer.appendChild(rankTrack);
            const durationTrackContainer = document.createElement("div");
            durationTrackContainer.classList.add("ms-2", "me-auto");
            const durationTrack = document.createElement("p");
            durationTrack.classList.add("fw-bold");
            durationTrack.innerText = track.duration;
            durationTrackContainer.appendChild(durationTrack);
            elList.append(
              containerImage,
              titleTrackContainer,
              rankTrackContainer,
              durationTrackContainer
            );

            //     listTrack.innerHTML = `
            //     <div class="d-flex align-items-center justify-content-between">
            //     <p class="mx-3"></p>
            //     <div class="mx-3">
            //       <img
            //         src="${track.contributors[0].picture_small}"
            //         alt=""
            //         class="img-fluid"
            //         style="width: 75px"
            //       />
            //     </div>

            //     <h4 class="mx-3">${track.title_short}</h4>

            //     <p class="mx-3">${track.rank}</p>

            //     <p class="mx-3">${track.duration}</p>
            //   </div>
            //   <div>
            //     <div class="d-flex align-items-center">
            //       <img
            //         src="assets/imgs/main/image-13.jpg"
            //         alt=""
            //         class="rounded-circle"
            //         style="width: 100px"
            //       />
            //       <div class="mx-3">
            //         <p>
            //           <strong>Hai messo mi piace a ${track.lenght} canzoni</strong>
            //         </p>
            //         <p>
            //           <strong>Dei ${track.artist.name}</strong>
            //         </p>
            //       </div>
            //     </div>
            //   </div>

            //     `;
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
findArtist();
window.onload = () => {
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
};
