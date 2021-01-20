var getUserRepos = function(users) {
    //format the github api url
    var apiUrl = "http://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

};

getUserRepos();