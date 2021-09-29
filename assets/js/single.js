var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {
    //create variable to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    //build out the basic http request to hit endpoing and check the info returned in response
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data) 
            });
        }
    
        else {
        alert("There was a problem with your request!");
    }
    console.log(repo);
});

}

var displayIssues = function(issues) {
    //check for repos with no issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issues)";
        }
        //append to container
        issueEl.appendChild(typeEl);

        //apend to page
        issueContainerEl.appendChild(issueEl);
    }

};
getRepoIssues("facebook/react");