// Initialize Firebase
var config = {
  apiKey: "AIzaSyBaTWuv65vV2X7fq4ZyFZF9EYtGZEdq0gQ",
  authDomain: "project-1-d9436.firebaseapp.com",
  databaseURL: "https://project-1-d9436.firebaseio.com",
  projectId: "project-1-d9436",
  storageBucket: "project-1-d9436.appspot.com",
  messagingSenderId: "30444118905"
};
firebase.initializeApp(config);

//Setting variable for firebase data
var database = firebase.database();

topics = [
{   topicName: "Art",
    className: "art",
    meetupCat: 1
},
{   topicName: "Business",
    className: "business",
    meetupCat: 2
},
{   topicName: "Reading & Writing",
    className: "readingWriting",
    meetupCat: 36
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
{   topicName: "Languages",
    className: "languages",
    meetupCat: 16
},
{   topicName: "Education",
    className: "education",
    meetupCat: 6
},
{   topicName: "Sports",
    className: "sports",
    meetupCat: 32
}
];

var sortedArr = topics.sort(function(a,b){
  if(a.topicName < b.topicName) return -1;
      if(a.topicName > b.topicName) return 1;
      return 0;
})

function searchArray (array, topic) {
    console.log(array, topic);
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

$("#buttons-view").on("click", ".btn", function() {


    var _this=this;

    function displayMeetups() {
        $("#meetupDisplay").empty();
        var meetupCat = searchArray(topics, $(_this).attr("job-name"));
        var meetUpKey = mKey || "";
        var queryURL = "https://api.meetup.com/find/groups?key=" + meetUpKey + "&zip=27703&radius=10&category=" + meetupCat;
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

               var meetupName = $("<p>").html("<span class='textBold'>Meetup Title: </span>" + data[i].name);
               meetupDiv.append(meetupName);

               var meetupLocation = $("<p>").html("<span class='textBold'>Location: </span>" + data[i].localized_location);
               meetupDiv.append(meetupLocation);

               var meetupLink = $("<p>").html("<span class='textBold'>Website: </span><a href='" + data[i].link + "' target= '_blank'>" + data[i].link + "</a>");
              meetupDiv.append(meetupLink);
              meetupDiv.append(meetupLink, $("<hr>"));

               $("#meetupDisplay").append(meetupDiv);
            }
        })
    }
    displayMeetups();


    function displayGlassdoor() {
      $("#jobDisplay").empty();
        var jobTitle = $(_this).attr("job-name");
        console.log(jobTitle + "Job Title");
        var glassDoorKey = gKey || "";
        var queryURL = "https://api.glassdoor.com/api/api.htm?t.p=207039&t.k=" + glassDoorKey + "&userip=0.0.0.0&q=" + jobTitle + "&useragent=&format=json&v=1&action=employers";
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
               var jobName = $("<p>").html("<span class='textBold'>Job Title: </span>" + data[i].name);
               jobDiv.append(jobName);
               var jobWorkLife = $("<p>").html("<span class='textBold'>Work Life Balance Rating: </span>" + data[i].workLifeBalanceRating);
               jobDiv.append(jobWorkLife);
               var jobWebsite = $("<p>").html("<span class='textBold'>Website: </span><a href='http://" + data[i].website + "' target= '_blank'>" + data[i].website + "</a>");
               console.log(jobWebsite + "Website for glassdoor");               
               jobDiv.append(jobWebsite);
               var jobRating = $("<p>").html("<span class='textBold'>Rating: </span>" + data[i].ratingDescription);
               jobDiv.append(jobRating);
               var jobIndustry = $("<p>").html("<span class='textBold'>Industry: </span>" + data[i].industry); 
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
      var eventfulKey = eKey || "";
      var queryURL = "https://api.eventful.com/json/events/search?app_key=" + eventfulKey + "&keywords=" + eventTitle + "&location=durham&within=40&category=conference&date=Future";
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
        var eventTitle = $("<p>").html("<span class='textBold'>Event Title: </span>" + data[i].title);
        eventDiv.append(eventTitle);
        var eventAddress = $("<p>").html("<span class='textBold'>Location: </span>" + data[i].venue_address);
        eventDiv.append(eventAddress);
        var eventUrl = $("<p>").html("<span class='textBold'>Website: </span><a href='" + data[i].url + "' target= '_blank'>" + data[i].url + "</a>");
        eventDiv.append(eventUrl, $("<hr>"));
        $("#eventDisplay").append(eventDiv);
      }
    })
    }
    displayEventful();
});

renderButtons();


//Saves data into variables
$("#submitInput").on("click", function(event){
  event.preventDefault();
  var firstName = $("#first_name").val();
  console.log(firstName);
  var lastName = $("#last_name").val();
  var email = $("#email").val();

  var newContact = {
    name: firstName,
    last: lastName,
    email: email
  }
  //Pushing data into firebase
  database.ref().push(newContact);

  //Clears input field
  $("#first_name").val("");
  $("#last_name").val("");
  $("#email").val("");
})




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
