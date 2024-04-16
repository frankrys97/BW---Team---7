const myKeyFrancesco = "29cd1ae8c9msh33b66faee0e4446p1a9f60jsnb42fe6b9c1f5";
const myKeyGiulio = "d470d1fc32mshf7e1a1bbce29cf1p138398jsnd112e2807eda";
const myKeyMarina = "2e8b5073f4mshff8ce3300bd3f70p160efajsn3e779e2eda67";
const myKeyCarlo = "62aa31e1edmsh5b877960812af61p1c1b11jsncd4891d90e66";

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
      const imageAlbum = data.cover_big;
      const artistName = data.artist.name;
      const albumTitle = data.title;
      const releaseDate = data.release_date;
      const trackCount = data.nb_tracks;
      const urlTrackList = data.tracklist;
      console.log(urlTrackList);

      const containerAlbum = document.getElementById("containerAlbum");
      containerAlbum.innerHTML = `<div class="row">
          <div class="col-2 pe-md-0">
            <img src="${imageAlbum}" class="img-fluid" alt="Album Image"/>
          </div>
          <div class="col-10 d-flex flex-column px-3">
            <p class="mt-auto mb-0">Album</p>
            <h1>${albumTitle}</h1>
            <p class="mb-0">${artistName} • ${releaseDate} • ${trackCount} Tracks</p>
          </div>
        </div>`;
    })
    .catch((error) => {
      console.error("Error fetching album:", error);
    });
};

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
      const containerTrack = document.getElementById("containerTrack");
      data.data.forEach((track) => {
        const trackTitle = track.title;
        const trackArtistName = track.artist.name;
        const trackDuration = track.duration;
        const trackPosition = track.track_position;

        htmlContent = `
          <div class="row px-2 me-4">
          <div class="col-6">
            <div class="d-flex align-items-center">
              <div class="p-2">
                <span class="song-number">${trackPosition}</span>
              </div>
              <div class="p-2">
                <div class="song-info">
                  <div class="song-text"><h4>${trackTitle}</h4></div>
                  <div class="song-artist"><p>${trackArtistName}</p></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 d-flex align-items-center justify-content-end">
            <p class="text-end">${trackDuration}</p>
          </div>
        </div>`;
      });
      containerTrack.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error fetching track list:", error);
    });
};

window.onload = () => {
  findAlbum("https://deezerdevs-deezer.p.rapidapi.com/album/7090505");
  createTrackList(
    "https://striveschool-api.herokuapp.com/api/deezer/album/7090505/top?limit=10"
  );
};
// https://striveschool-api.herokuapp.com/api/deezer/album/7090505/top?limit=10
