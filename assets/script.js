var userFormEl = document.querySelector("#form");
var nameInputEl = document.querySelector("#submitBtn");
var repoContainerEl = document.querySelector("#list-container");
var repoSearchTerm = document.querySelector("#music-search-term");
var clearSearch = document.querySelector("#clearBtn");
var userInputEl = document.querySelector("#input-data");

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
  console.log(userInputEl);
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

  //repoSearchTerm.textContent = SearchTerm;

  // loop over repos
  for (var i = 0; i < data.length; i++) {
    // format repo name

    var repoName = data[i].url;


    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", repoName);
    repoEl.setAttribute("target", "_blank")
    // create a span element to hold repository name
    var titleEl = document.createElement("li");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);



    // append container to the dom
    repoContainerEl.appendChild(repoEl);
    repoEl.addEventListener("click", function () {
      saveMusic(repoName);
    });
    //saveMusic();
  }
};

var resetForm = function () {
  location.reload()
}

var saveMusic = function (songUrl) {
  var arrayFromLocalStorage = localStorage.getItem("playlist");
  //if statement is going to go here 
  if (arrayFromLocalStorage)   {
   //var newArray = arrayFromLocalStorage.push(songUrl)
    console.log(arrayFromLocalStorage);
   //localStorage.setItem("playlist", newArray)
   arrayFromLocalStorage.push(songUrl)
   localStorage.setItem("playlist",arrayFromLocalStorage)
  }
  else {
    var firstSong = [songUrl];
    localStorage.setItem("playlist",firstSong)
  }

}


// add event listeners to form and button container//
userFormEl.addEventListener("click", artistName);
clearSearch.addEventListener("click", resetForm);
nameInputEl.addEventListener("click", formSubmitHandler);

