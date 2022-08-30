var userFormEl = document.querySelector("#form");
var nameInputEl = document.querySelector("#submitBtn");
var repoContainerEl = document.querySelector("#list-container");
var repoSearchTerm = document.querySelector("#music-search-term");
var clearSearch = document.querySelector("#clearBtn");
var userInputEl = document.querySelector("#input-data");

var formSubmitHandler = function(event) {
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


var getUserRepos = function(data) {
  // format the api url
  
    var apiUrl = "https://api.mixcloud.com/search/?q=" + data + "&limit=5&type=cloudcast";
 

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(data.data);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

var displayRepos = function(data) {
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

    // create a li element to hold repository name
    repoContainerEl.classList = "box field is-vertical is-size-12 mr-6 ml-6"

    var titleEl = document.createElement("li");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl)
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
var resetForm = function (){
    location.reload()
}

var formTopFive = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = userInputEl.value.trim();

  if (username) {
    getUserTopFive(username);

    // clear old content
    repoContainerEl.textContent = "";
    userInputEl.value = "";
  } else {
    alert("Please valid artist/band name");
  }
};

var getUserTopFive = function(data) {
  // format the api url
  
    var napUrl = "https://api.napster.com/v2.2/artists/top?limit=5&offset=5&apikey=MWVlYWFlNDQtMzc5NS00M2U3LWI3MTktNTUxMzU3OGY1N2E1";
 

  // make a get request to url
  fetch(napUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayNaps(data.data);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

var displayNaps = function(data) {
    // check if api returned any repos

    if (data.length === 0) {
      repoContainerEl.textContent = "No playlist found.";
      return;
    }
  
    //repoSearchTerm.textContent = SearchTerm;
  
    // loop over repos
    for (var i = 0; i < data.length; i++) {
      // format repo name

      var repoName = data[i].name + "/" + data[i].url;


    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("li");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);



    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
var resetForm = function (){
    location.reload()
}

  // add event listeners to form and button container//
  userFormEl.addEventListener("click", artistName);
  clearSearch.addEventListener("click", resetForm);
  nameInputEl.addEventListener("click", formSubmitHandler);
  nameInputEl.addEventListener("click", formTopFive);

// add event listeners to form and button container//
userFormEl.addEventListener("click", artistName);
nameInputEl.addEventListener("click", formSubmitHandler);
clearSearch.addEventListener("click", resetForm);
