var userFormEl = document.querySelector("#form");
var nameInputEl = document.querySelector("#submitBtn");
var repoContainerEl = document.querySelector("#list-container");
var repoContainerEltwo = document.querySelector("#tracks-template")
var repoSearchTerm = document.querySelector("#music-search-term");
var clearSearch = document.querySelector("#clearBtn");
var userInputEl = document.querySelector("#input-data");
var napsterFiveList = document.querySelector("#tracks-template");

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
var resetForm = function () {
  location.reload()
}
  // format the napster api url
  var napsterFive = function(type) {
  var napsterUrl = "https://api.napster.com/v2.2/artists/search/" + type +"/top?pretty=true&limit=5&offsett=5";
  // ?limit=5&type=5&apikey=MWVlYWFlNDQtMzc5NS00M2U3LWI3MTktNTUxMzU3OGY1N2E1");

    fetch(napsterUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (type) {
          console.log(type);
          displayTopTracks(type.type);
        });
      } else {
        alert('Artist Not Found');
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
  };

var displayTopTracks = function (type) {
  // check if api returned any repos

  if (type.length === 0) {
    repoContainerEltwo.textContent = "No artist found.";
    return;
  }
console.log(type);
  //repoSearchTerm.textContent = SearchTerm;

  // loop over repos
  for (var i = 0; i < type.length; i++) {
    // format repo name

    var napRepo = type[i].url;


    // create a link for each repo
    var repoEltwo = document.createElement("a");
    repoEltwo.classList = "list-item flex-row justify-space-between align-center";
    repoEltwo.setAttribute("href", napRepo);

    // create a li element to hold tracks name
    repoContainerEltwo.classList = "box field is-vertical is-size-12 mr-6 ml-6"

    var titleEltwo = document.createElement("li");
    titleEltwo.textContent = napRepo;

    // append to container
    repoEltwo.appendChild(titleEltwo)
    // append container to the dom
    repoContainerEltwo.appendChild(repoEltwo);
  }
};
var resetForm = function () {
  location.reload()
}



  // var napUrl = "https://api.napster.com/v2.2/artists/top?limit=5&offset=5&apikey=MWVlYWFlNDQtMzc5NS00M2U3LWI3MTktNTUxMzU3OGY1N2E1";

// add event listeners to form and button container//
userFormEl.addEventListener("click", artistName);
clearSearch.addEventListener("click", resetForm);
nameInputEl.addEventListener("click", formSubmitHandler);
napsterFiveList.addEventListener("click", napsterFive);

//  var responseTopFive= fetch(topTracksUrl)
//.then(function (responseTopFive) {
  // request was successful
  //if (responseTopFive.ok) {
    //console.log(responseTopFive);
    //responseTopFive.json().then(function (displayTopTracks) {
      //console.log(responseTopFive);
      //displayTopTracks(responseTopFive);
    //});
 // } else {
//    alert('Artist Not Found');
 // }
//})
//.catch(function (error) {
  //alert("Unable to connect");
//});
