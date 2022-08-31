var userFormEl = document.querySelector("#form");
var nameInputEl = document.querySelector("#submitBtn");
var repoContainerEl = document.querySelector("#list-container");
var repoSearchTerm = document.querySelector("#music-search-term");
var clearSearch = document.querySelector("#clearBtn");
var userInputEl = document.querySelector("#input-data");
var searchedSongList = document.querySelector("#savedSongs");
var topFive = document.querySelector("#top-5");

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = userInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerEl.textContent = "";
    userInputEl.value = "";
  } else {
    alert("Please valid artist/band name");
  }
};

function artistName(event) {
  event.preventDefault();
  var userInputEl = document.querySelector("input[name='artist']").value;
}

var getUserRepos = function (data) {
  // format the api url

  var apiUrl = "https://api.mixcloud.com/search/?q=" + data + "&limit=5&type=cloudcast";

  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data.data);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

var displayRepos = function (data) {
  // check if api returned any repos

  if (data.length === 0) {
    repoContainerEl.textContent = "No playlist found.";
    return;
  }

  // loop over repos
  for (var i = 0; i < data.length; i++) {
    // format repo name
    var repoName = data[i].url;

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", repoName);
    repoEl.setAttribute("target", "_blank");
    
    // create a li element to hold repository name
    repoContainerEl.classList = "box is-vertical is-size-12 mr-6 ml-6"

    var titleEl = document.createElement("li");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);
    // append container to the dom
    repoContainerEl.appendChild(repoEl);

    // append to container
    repoEl.appendChild(titleEl);
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
    saveMusic(repoName)
  }
};

var getNapRepos = function (tracks) {
  // format the github api url
  var napUrl = "https://api.napster.com/v2.2/artists/Art.28463069/tracks/top?limit=5&offset=5&apikey=MWVlYWFlNDQtMzc5NS00M2U3LWI3MTktNTUxMzU3OGY1N2E1";
  // make a get request to url
  fetch(napUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (tracks) {
          console.log(tracks);
          displayTracks(tracks.tracks);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};
var displayTracks = function (tracks) {
 
  // loop over repos
  for (var i = 0; i < tracks.length; i++) {
    // format repo name
    var napRepo = tracks[i].href;
    // create a link for each repo
    var topFiveEl = document.createElement("a");
    topFiveEl.classList = "list-item flex-row justify-space-between align-center";
    topFiveEl.setAttribute("href", napRepo);
    
    // create a span element to hold repository name

    var napTitleEl = document.createElement("span");
    repoContainerEl.classList = "box is-vertical is-size-12 mr-6 ml-6"

    var napTitleEl = document.createElement("li");
    napTitleEl.textContent = napRepo;
    // append to container
    topFiveEl.appendChild(napTitleEl);
    
    // append to container
    topFiveEl.appendChild(napTitleEl);
    repoContainerEl.appendChild(topFiveEl);
  };
  console.log(napRepo);
};

var resetForm = function () {
  location.reload()
}

function saveMusic(data)
{
    var playlist = [];
    // Parse the serialized data back into an aray of objects
    playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    playlist.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

var loadUserSong = function() {
  var savedUserSong = localStorage.getItem("playlist");

  // parse into array of objects
  songs = JSON.parse(savedUserSong);
  console.log(songs);

  var songs = document.createElement("a");
  songs.setAttribute("href", savedUserSong);
  songs.setAttribute("target", "_blank")

  var savedSong = document.createElement("li");
  savedSong.className = "box is-vertical is-size-12 mr-6 ml-6";
  
  var songData = document.createElement("li");
  songData.className = "playlist";
  songData.innerText = songs
      
  savedSong.appendChild(songData);
  repoContainerEl.appendChild(savedSong);
     
};

// add event listeners to form and button container//
userFormEl.addEventListener("click", artistName);
clearSearch.addEventListener("click", resetForm);
nameInputEl.addEventListener("click", formSubmitHandler);
searchedSongList.addEventListener("click", loadUserSong);
topFive.addEventListener("click", getNapRepos)