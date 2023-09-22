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

  var apiUrl = "https://api.mixcloud.com/search/?q=" + data + "&limit=15&type=cloudcast";

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
        module('Artist Not Found');
      }
    })
    .catch(function (error) {
      module("Unable to connect");
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
    var repoLink = data[i].url;
    var repoName = data[i].name;
    var repoImage = data[i].pictures.large
    console.log(repoImage)

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.textContent = repoName
    repoEl.classList = "list-item flex-row justify-space-between align-center overlay";
    repoEl.setAttribute("href", repoLink);
    repoEl.setAttribute("target", "_blank");

    var repoImg = document.createElement("img")
    repoImg.textContent = repoImage
    repoImg.setAttribute("src", repoImage)
    
    var saveBtn = document.createElement('button')
    saveBtn.textContent = "Save";
    saveBtn.setAttribute("id", repoName)
    // create a li element to hold repository name
    repoContainerEl.classList = "box is-vertical is-size-12 mr-6 ml-6"

    var titleEl = document.createElement("div");
    titleEl.classList = 'thumbnail'
    titleEl.setAttribute("id", repoName)

    // append to container
    titleEl.appendChild(repoImg);
    titleEl.appendChild(repoEl);
    titleEl.appendChild(saveBtn)

    // append container to the dom
    repoContainerEl.appendChild(titleEl);
    
    //saveMusic(repoName)
    var saveSong = document.getElementById(repoName)
    saveSong.onclick = function(e) { savePlaylist(e.target)}
  }
};

var getNapRepos = function (data) {
  // format the github api url
  var napUrl = "https://api.mixcloud.com/search/?q=drake&limit=15&type=cloudcast&apikey=MWVlYWFlNDQtMzc5NS00M2U3LWI3MTktNTUxMzU3OGY1N2E1";
  // make a get request to url
  fetch(napUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayTracks(data.data);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};
var displayTracks = function (data) {
  var title = document.createElement("h2")
  title.classList = "h2"
  title.textContent = "Top 15 By Drake"
  repoContainerEl.appendChild(title)
 
  // loop over repos
  for (var i = 0; i < data.length; i++) {
    // format repo name
    var napRepo = data[i].url;
    var napRepoName = data[i].name
    var repoImage = data[i].pictures.large
    // create a link for each repo
    var topFiveEl = document.createElement("a");
    topFiveEl.textContent = napRepoName
    topFiveEl.classList = "list-item flex-row justify-space-between align-center overlay";
    topFiveEl.setAttribute("href", napRepo);
    topFive.setAttribute("target", "_blank");

    var repoImg = document.createElement("img")
    repoImg.textContent = repoImage
    repoImg.setAttribute("src", repoImage)

    var title = document.createElement("h2")
    title.textContent = "Top 15 By drake"
    
    // create a span element to hold repository name
    var napTitleEl = document.createElement("div");
    napTitleEl.classList = 'thumbnail'
    repoContainerEl.classList = "box is-vertical is-size-12 mr-6 ml-6"

    // append to container
    napTitleEl.appendChild(topFiveEl);
    napTitleEl.appendChild(repoImg);
    
    // append to container
    repoContainerEl.appendChild(napTitleEl);
  };
  console.log(napRepo);
};

var resetForm = function () {
  location.reload()
}

//function saveMusic(data)
//{
    //var playlist = [];
    // Parse the serialized data back into an aray of objects
    //playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    //playlist.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    //localStorage.setItem('playlist', JSON.stringify(playlist));
//}

//var loadUserSong = function() {
  //var savedUserSong = localStorage.getItem("playlist");

  // parse into array of objects
  //songs = JSON.parse(savedUserSong);
  //console.log(songs);

  //var songs = document.createElement("a");
  //songs.setAttribute("href", savedUserSong);
  //songs.setAttribute("target", "_blank")

  //var savedSong = document.createElement("li");
  //savedSong.className = "box is-vertical is-size-12 mr-6 ml-6";
  
  //var songData = document.createElement("li");
  //songData.className = "playlist";
  //songData.innerText = songs
      
  //savedSong.appendChild(songData);
  //repoContainerEl.appendChild(savedSong);  
//};

function savePlaylist(i) {
  var newkey = i.id;
  var keyExists = true

  for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    console.log(key)
    console.log(value)
    console.log(newkey)
    if(value.includes(newkey)){
    console.log("It existsss");
    keyExists = false
    }
  }
  console.log(keyExists)

  if (keyExists) {
    var key = Math.random() + Date.now();
    var saveSong = document.getElementById(newkey);
    console.log(newkey)
    localStorage.setItem(key, saveSong.outerHTML);
  }
else {
    console.log("Already saved!");
  }
}

// add event listeners to form and button container//
userFormEl.addEventListener("click", artistName);
clearSearch.addEventListener("click", resetForm);
nameInputEl.addEventListener("click", formSubmitHandler);
//searchedSongList.addEventListener("click", loadUserSong);
topFive.addEventListener("click", getNapRepos)