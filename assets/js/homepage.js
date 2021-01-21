var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");





// form 


var formSubmitHander = function(event) {
    event.preventDefault();
    // get the value from input element
    var username = nameInputE1.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputE1.value = "";
        // clear old content
        repoContainerE1.textContent = " ";
        repoSearchTerm.textContent = "search";
        } else {
        alert("Please enter a GitHub username");
    }
};
var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = ("http://api.github.com/users/" + user + "/repos");

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    }else{
        alert("Error: " + response.statusText);
    }
    })
    .catch(function(error) {
        // Notice this '.catch' getting chained onto the end of the '.then()' method
        alert("Unable to connect to GitHub");
    });
};

var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0){
        repoContainerE1.textContent = "No repositories found.";
        return;
    }

   

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoE1 = document.createElement("div");
        repoE1.classList = "list-item flex-row justify-space-between align center";

        // create a span element to hold respository name
        var titleE1 = document.createElement("span");
        titleE1.textContent = repoName;

        //append to container
        repoE1.appendChild(titleE1);

        //append container to the dom
        repoContainerE1.appendChild(repoE1);
    }
}
userFormE1.addEventListener("submit", formSubmitHander);