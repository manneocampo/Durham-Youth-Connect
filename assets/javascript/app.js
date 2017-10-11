topics = ["Art", "History", "Music", "Reading & Writing", "Technology", "Health & Wellness", "Environment", "Activism", "Fashion & Beauty", "Fitness", "Food", "Games", "Cars & Bikes", "Animals", "Volunteering"];

//-------------------------
//Glassdoor ajax 
//-------------------------

function displayJobs() {
    var jobTitle = Activism; 
    var queryURL = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=207039&t.k=ceLZoILrTzK&action=employers&q=" + jobTitle + "&userip=192.168.43.42&useragent=Mozilla/%2F4.0";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        
    })
}
//-------------------------
//Meetup ajax 

var queryURL = "https://api.meetup.com/find/groups?key=5c494f7b021e603a26228786855b&zip=27703&radius=10&category=25&order=members"


//-------------------------

//-------------------------
//Glassdoor ajax 
//-------------------------

function renderButtons() {
    $("#buttons-view").empty();
    console.log("buttons view");
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif btn btn-info");
        a.text(topics[i]);
        $("#buttons-view").append(a);
    };
}
renderButtons();

$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);
    renderButtons();
});

