topics = [
{   topicName: "Art",
    className: "art",
    meetupCat: 1
},
{   topicName: "History",
    className: "history",
    meetupCat: 0
},
{   topicName: "Reading & Writing",
    className: "readingWriting",
    meetupCat: 18
    //add category 36 too
},
{   topicName: "Technology",
    className: "technology",
    meetupCat: 34   
},
{   topicName: "Health & Wellness",
    className: "healthWellness",
    meetupCat: 14
},
{   topicName: "Environment",
    className: "environment",
    meetupCat: 4
},
{   topicName: "Activism",
    className: "activism",
    meetupCat: 13
},
{   topicName: "Fashion & Beauty",
    className: "fashionBeauty",
    meetupCat: 8
},
{   topicName: "Fitness",
    className: "fitness",
    meetupCat: 9
},
{   topicName: "Food",
    className: "food",
    meetupCat: 10
},
{   topicName: "Games",
    className: "games",
    meetupCat: 11
},
{   topicName: "Cars & Bikes",
    className: "carsBikes",
    meetupCat: 3
},
{   topicName: "Animals",
    className: "animals",
    meetupCat: 26
},
{   topicName: "Volunteering",
    className: "volunteering",
    meetupCat: 0
}
];

function searchArray (array, topic) {
    return array.filter(function(obj){
        return obj.topicName === topic;
    })[0].meetupCat;
}


//Turning topics array into buttons
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-info displayer" + topics[i].className);

        a.attr("job-name", topics[i].topicName)
        console.log(a + "Attribute")

        a.text(topics[i].topicName);
        $("#buttons-view").append(a);
    };
}

$(document).on("click", ".btn", function() {
    var _this=this;

    function displayMeetups() {
        $("#meetupDisplay").empty();
        var meetupCat = searchArray(topics, $(_this).attr("job-name"));
        var queryURL = "https://api.meetup.com/find/groups?key=5c494f7b021e603a26228786855b&zip=27703&radius=10&category=" + meetupCat;
        $.ajax({
            url: queryURL,
            crossDomain: true,
            dataType: 'jsonp',
            method: "GET"
        }).done(function(response) {
            var data = response.data;
            console.log(data[0].name);
            console.log(response);

            for (var i = 0; i < data.length; i++){
               var meetupDiv = $("<div>");

               var meetupName = $("<p>").text(data[i].name);
               meetupDiv.append(meetupName);

               var meetupLink = $("<p>").text(data[i].link);
               meetupDiv.append(meetupLink);

               // var nextMeeting = $("<p>").text("Next Meetup" + data[i].next_event.time);
               // meetupDiv.append(nextMeeting);
               $("#meetupDisplay").append(meetupDiv);
            }
        })
    }
    displayMeetups();


    function displayJobs() {
      $("#jobDisplay").empty();
        var jobTitle = $(this).attr("job-name");
        console.log(jobTitle + "Job Title");
        var queryURL = "https://api.glassdoor.com/api/api.htm?t.p=207039&t.k=ceLZoILrTzK&userip=0.0.0.0&q=" + jobTitle + "&useragent=&format=json&v=1&action=employers";
        $.ajax({
            url: queryURL,
            crossDomain: true,
            dataType: 'jsonp',
            method: "GET"
        }).done(function(response) {
           var data = response.response.employers
           console.log(data);
           //Goes through each index to display data
            for (var i = 0; i < data.length; i++){
               //creating new div to display information
               var jobDiv = $("<div>");
               var jobName = $("<p>").text("Job Title: " + data[i].name);
               jobDiv.append(jobName);
               var jobWebsite = $("<p>").text("Website: " + data[i].website);
               jobDiv.append(jobWebsite);
               var jobRating = $("<p>").text("Rating: " + data[i].ratingDescription);
               jobDiv.append(jobRating);
               var jobIndustry = $("<p>").text("Industry: " + data[i].industry); 
               jobDiv.append(jobIndustry);
               $("#jobDisplay").append(jobDiv);
            }
        })
    };
    displayJobs();
});

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
