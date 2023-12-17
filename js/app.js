/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Preet Bhagyesh patel
 *      Student ID: 132603226
 *      Date:       23 November, 2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
document.addEventListener("DOMContentLoaded", function () {
  let index = 0;
  //default header and info of the first artist until button is clicked

  displayArtistHeader(artists[index]);
  createSongCard(artists[index]);

  

  function displayArtistHeader(artist) {
    let h2 = document.querySelector("#selected-artist");
    h2.innerText = artist.name;

    const urlsText = artist.urls.map(
      (url) =>
        `<a href="${url.url}" target="_blank"><img src="${url.img}"style="vertical-align: middle;"></a>`,
    );
    h2.innerHTML += urlsText.join(" ");

    let menu = document.querySelector("#menu");
    menu.innerHTML = "";

    artists.forEach(function (a) {
      let button = document.createElement("button");
      button.innerText = a.name;
      button.onclick = function () {
        displayArtistHeader(a);
        createSongCard(a);
      };
      menu.appendChild(button);
    });
  }

  function createSongCard(artists) {
    let allCardsDiv = document.querySelector(".All-Cards");
    allCardsDiv.innerHTML = "";

    let filteredSongs = songs.filter(
      (song) => song.artistId === artists.artistId && song.explicit === false,
    );
    console.log(filteredSongs);

    filteredSongs.forEach(function (song) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      const img = document.createElement("img");
      img.src = song.imgURL;
      const textDiv = document.createElement("div");
      textDiv.className = "text";
      const h1 = document.createElement("h1");
      // h1.innerText=song.title;
      let a = document.createElement("a");
      a.href = song.url;
      a.innerText = song.title;
      a.target = "_blank";
      const p = document.createElement("p");
      p.innerText = song.year;
      const time = document.createElement("time");
      time.innerText = secondsToMinutesAndSeconds(song.duration);
      allCardsDiv.appendChild(cardDiv);
      cardDiv.appendChild(img);
      cardDiv.appendChild(textDiv);
      textDiv.appendChild(h1);
      h1.appendChild(a);
      textDiv.appendChild(p);
      textDiv.appendChild(time);
    });
  }

  function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds}`;

    return formattedTime;
  }
});
