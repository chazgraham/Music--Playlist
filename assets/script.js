var userFormEl = document.querySelector("#form");
var nameInputEl = document.getElementById("submitBtn");
var repoContainerEl = document.querySelector("#list-container");
var repoSearchTerm = document.querySelector("#music-search-term");
var clearSearch = document.getElementById("clearBtn")

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    nameInputEl.value = "";
  } else {
    alert("Please valid artist/band name");
  }
};


var getUserRepos = function(response) {
  // format the github api url
  var apiUrl = "https://api.napster.com//v2.2/artists/Art.28463069/tracks/top?limit=10&offset=5&apikey=MWVlYWFlNDQtMzc5NS00M2U3LWI3MTktNTUxMzU3OGY1N2E1";
  console.log(response);

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(response);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

var displayRepos = function(tracks) {
    // check if api returned any repos
    if (tracks.length === 0) {
      repoContainerEl.textContent = "No playlist found.";
      return;
    }
  
    repoSearchTerm.textContent = tracks;
  
    // loop over repos
    for (var i = 0; i < tracks.length; i++) {
      // format repo name
      var repoName = tracks.artistName[i] + "/" + tracks.albuminName[i];

  
      // selector to hold repository name
      var titleEl = document.querySelector("#list-item");
      titleEl.textContent = repoName;
  

  
      // append container to the dom
      repoContainerEl.appendChild(repoName);
    }
  };

  var resetForm = function () {
    location.reload()
  }
  
  // add event listeners to form and button container//
  userFormEl.addEventListener("submit", formSubmitHandler);
  clearSearch.addEventListener("click", resetForm);
