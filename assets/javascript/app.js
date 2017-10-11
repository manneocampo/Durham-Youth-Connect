topics = ["Art", "History", "Music", "Reading & Writing", "Technology", "Health & Wellness", "Environment", "Activism", "Fashion & Beauty", "Fitness", "Food", "Games", "Cars & Bikes", "Animals", "Volunteering"];

//-------------------------
// Glassdoor ajax 
//-------------------------
var queryURL = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=207039&t.k=ceLZoILrTzK&action=employers&q=pharmaceuticals&userip=192.168.43.42&useragent=Mozilla/%2F4.0"
//-------------------------
//Meetup ajax 

var queryURL = "https://api.meetup.com/find/groups?zip=27701&radius=20&category=20&order=members"

//-------------------------

//-------------------------
// Glassdoor ajax 
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
