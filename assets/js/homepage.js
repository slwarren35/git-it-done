//target the repo container where we will diplay the repos
var repoContainerEl = document.querySelector("#repos-container");
//targets the span element to display the search term used
var repoSearchTerm = document.querySelector("#repo-search-term");

//targets the entire form where the user enters informatino
var userFormEl = document.querySelector("#user-form");
//targets the username entered in the search box
var nameInputEl = document.querySelector("#username");



var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                    console.log(data);
                });
            }else   {
                alert("Error: GitHub User Not Found");

        }
    })
    .catch(function(error) {
        //Notice this '.catch()' getting chained onto the end of the '.then()'
        alert("Unable to connect to GitHub");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

//create a function to display repos
var displayRepos = function(repos, searchTerm) {
    // check is api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
                "<i class='fas fa-times status-icon icon-danger'</i>" + repos[i].open_issues_count + " issue(s)";      
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(titleEl);

        //append to container
        repoEl.appendChild(statusEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);

    }
}

userFormEl.addEventListener("submit", formSubmitHandler);