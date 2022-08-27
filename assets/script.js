var userFormEl = document.querySelector("#form");
var nameInputEl = document.getElementById("#submitBtn");
var repoContainerEl = document.querySelector("#list-container");
var repoSearchTerm = document.querySelector("#music-search-term");
var clearSearch = document.getElementById("clearBtn");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please valid artist/band name");
  }
};


var getUserRepos = function(artists) {
  // format the github api url
 
  var apiUrl = " https://api.mixcloud.com/search/?q=" + nameInputEl + "&type=cloudcast";
 

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(data,artists);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

var displayRepos = function(tracks, SearchTerm) {
    // check if api returned any repos
    if (tracks.length === 0) {
      repoContainerEl.textContent = "No playlist found.";
      return;
    }
  
    repoSearchTerm.textContent = SearchTerm;
  
    // loop over repos
    for (var i = 0; i < tracks.length; i++) {
      // format repo name
      var repoName = data[i].url + "/" + data[i].name;


    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";


    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

var resetForm = function () {
  location.reload()
}

  // add event listeners to form and button container//
  userFormEl.addEventListener("submit", formSubmitHandler);
  clearSearch.addEventListener("click", resetForm);