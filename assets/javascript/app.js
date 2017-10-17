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
    console.log(array, topic);
    return array.filter(function(obj){
        return obj.topicName === topic;
    })[0].meetupCat;
}

//Turning topics array into buttons
function renderButtons() {
    $("#buttons-view").empty();
    console.log("buttons view");
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

               var meetupName = $("<p>").text("Meetup Title: " + data[i].name);
               meetupName.addClass("jobName");
               meetupDiv.append(meetupName);

               var meetupLocation = $("<p>").text("Location: " + data[i].localized_location);
               meetupDiv.append(meetupLocation);

               var meetupLink = $("<p>").text("Website: " + data[i].link);
               meetupDiv.append(meetupLink, $("<hr>"));

               // var nextMeeting = $("<p>").text("Next Meetup" + data[i].next_event.time);
               // meetupDiv.append(nextMeeting);
               $("#meetupDisplay").append(meetupDiv);
            }
        })
    }
    displayMeetups();


    function displayGlassdoor() {
      $("#jobDisplay").empty();
        var jobTitle = $(_this).attr("job-name");
        console.log(jobTitle + "Job Title");
        var queryURL = "https://api.glassdoor.com/api/api.htm?t.p=207039&t.k=ceLZoILrTzK&userip=0.0.0.0&q=" + jobTitle + "&useragent=&format=json&v=1&action=employers";
        $.ajax({
            url: queryURL,
            crossDomain: true,
            dataType: 'jsonp',
            method: "GET"
        }).done(function(response) {
           var data = response.response.employers
           console.log(data + "glassdoor data");
           //Goes through each index to display data
            for (var i = 0; i < data.length; i++){
               //creating new div to display information
               var jobDiv = $("<div>");
               var jobName = $("<p>").text("Job Title: " + data[i].name);
               jobName.addClass("jobName");
               jobDiv.append(jobName);
               var jobWorkLife = $("<p>").text("Work Life Balance Rating: " + data[i].workLifeBalanceRating);
               jobDiv.append(jobWorkLife);
               var jobWebsite = $("<p>").text("Website: " + data[i].website);
               jobDiv.append(jobWebsite);
               var jobRating = $("<p>").text("Rating: " + data[i].ratingDescription);
               jobDiv.append(jobRating);
               var jobIndustry = $("<p>").text("Industry: " + data[i].industry); 
               jobDiv.append(jobIndustry, $("<hr>"));
               $("#jobDisplay").append(jobDiv);
            }
        })
    };
    displayGlassdoor();

    function displayEventful (){
      $("#eventDisplay").empty();
      var eventTitle = $(_this).attr("job-name");
      console.log(eventTitle + "Event Title");
      var queryURL = "https://api.eventful.com/json/events/search?app_key=DF6QBLC8cHbjpQZc&keywords=" + eventTitle + "&location=durham&within=40&category=conference&date=Future";
    $.ajax({
      url: queryURL,
      crossDomain: true,
      dataType: 'jsonp',
      method: "GET"  
    }).done(function(response){
      var data = response.events ? response.events.event : [];
      console.log(data+ "Eventful data");
      for(var i = 0;i < data.length;i++){
        var eventDiv = $("<div>");
        var eventTitle = $("<p>").text("Event Title: " + data[i].title);
        eventTitle.addClass("jobName");
        eventDiv.append(eventTitle);
        var eventAddress = $("<p>").text("Location: " + data[i].venue_address);
        eventDiv.append(eventAddress);
        var eventUrl = $("<p>").text("Website: " + $("<a href='") + data[i].url + $("'</a>"));
        eventDiv.append(eventUrl, $("<hr>"));
        $("#eventDisplay").append(eventDiv);
      }
    })
    }
    displayEventful();
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

// Mobile nav start


  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

// Mobile nav end
