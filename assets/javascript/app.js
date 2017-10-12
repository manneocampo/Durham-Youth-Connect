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

// Glassdoor 
function displayJobs() {
    var jobTitle = "activism"; 
    var queryURL = "https://api.glassdoor.com/api/api.htm?v=1.1&format=json&t.p=207039&t.k=ceLZoILrTzK&action=employers&q=pharmaceuticals&userip=45.37.69.64&useragent=Mozilla/%2F4.0";
    $.ajax({
        url: queryURL,
        method: "GET",
        header: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": null
        }
    }).done(function(response) {
      console.log(response);
    })
}
displayJobs();

//Meetup  
function displayMeetups() {
// var queryURL = "https://api.meetup.com/find/groups?key=5c494f7b021e603a26228786855b&zip=27703&radius=10&category=25&order=members"
    var queryURL = "https://api.meetup.com1/find/groups2?zip=27703&radius=1&category=253";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
      console.log(response);
    })
}
displayMeetups();


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

// //------Add new topic/button----------------------
// $("#add-topic").on("click", function(event) {
//     event.preventDefault();
//     var newTopic = $("#topic-input").val().trim();
//     var newClassName = newTopic.toLowerCase().replace(/ +/g, "");
//     var newTopicObject = {
//         topicName: newTopic,
//         className: newClassName
//     };
//     console.log("object working: " + newTopicObject.topicName, newTopicObject.className);
//     topics.push(newTopicObject);
//     renderButtons();
// });
