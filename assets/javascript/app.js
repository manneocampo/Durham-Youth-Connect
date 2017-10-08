topics = ["Art", "History", "Music", "Reading & Writing", "Technology", "Health & Wellness", "Environment", "Activism", "Fashion & Beauty", "Fitness", "Food", "Games", "Cars & Bikes", "Animals", "Volunteering"];

//-------------------------
//Glassdoor ajax 
//-------------------------

//-------------------------
//Meetup ajax 
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

