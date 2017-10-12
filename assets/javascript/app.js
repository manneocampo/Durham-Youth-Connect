topics = [
{   topicName: "Art",
    className: "art"
},
{   topicName: "History",
    className: "history"
},
{   topicName: "Reading & Writing",
    className: "readingWriting"
},
{   topicName: "Technology",
    className: "technology"
},
{   topicName: "Health & Wellness",
    className: "healthWellness"
},
{   topicName: "Environment",
    className: "environment"
},
{   topicName: "Activism",
    className: "activism"
},
{   topicName: "Fashion & Beauty",
    className: "fashionBeauty"
},
{   topicName: "Fitness",
    className: "fitness"
},
{   topicName: "Food",
    className: "food"
},
{   topicName: "Games",
    className: "games"
},
{   topicName: "Cars & Bikes",
    className: "carsBikes"
},
{   topicName: "Animals",
    className: "animals"
},
{   topicName: "Volunteering",
    className: "volunteering"
}
];

//-------------------------
// Glassdoor ajax 
//-------------------------

function displayJobs() {
    var jobTitle = Activism; 
    var queryURL = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=207039&t.k=ceLZoILrTzK&action=employers&q=" + jobTitle + "&userip=192.168.43.42&useragent=Mozilla/%2F4.0";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
       var database = response.employers
       console.log(database);

       var jobName = database.name
/*       var jobRating
       var industry
       var location
*/
       console.log(jobName); 
    })
}
displayJobs()
//-------------------------
//Meetup ajax 

var queryURL = "https://api.meetup.com/find/groups?key=5c494f7b021e603a26228786855b&zip=27703&radius=10&category=25&order=members"


//-------------------------

//-------------------------
// Glassdoor ajax 
//-------------------------

function renderButtons() {
    $("#buttons-view").empty();
    console.log("buttons view");
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif btn btn-info " + topics[i].className);
        a.text(topics[i].topicName);
        $("#buttons-view").append(a);
    };
}
renderButtons();

// $("#add-topic").on("click", function(event) {
//     event.preventDefault();
//     var newTopic = $("#topic-input").val().trim();
//     //Nicole researching how to push the new button into the object
//     topics.topicName.push(newTopic);
//     renderButtons();
// });
