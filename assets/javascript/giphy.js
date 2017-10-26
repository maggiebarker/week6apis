//Get my topics
var topics = ["football", "basketball", "soccer", "baseball", "hockey", "volleyball", "golf"];
console.log(topics);
//Show the buttons
function renderBtns() {
 $("#sports-view").empty();

//Loop through the array of topics
 for (var i = 0; i < topics.length; i++) {
 	var a = $("<button>");
 	a.addClass("sports");
 	a.attr("data-name", topics[i]);
 	a.text(topics[i]);
 	$("#sports-view").append(a);
 }
}

$("#add-sport").on("click", function(event) {
	event.preventDefault();
//Grab the new sport from the input box
	var sports = $("#sports-input").val().trim();
	topics.push(sports);
	console.log(topics);

renderBtns();

});

renderBtns();


//Bring in the gifs! First, our key:
var apiKey = "228z5wIEwb7ZVKcEdK6NJoB2D87Mu7D7";

    $("#sports-view").on("click", ".sports", function() {
    	$("#sportsGifs").empty()
//"this" refers to the button that was clicked
      var sport = $(this).attr("data-name");

// Constructing a URL to search giphy for the sport
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key="+ apiKey + "&limit=10";

// Perform the AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
// After the data comes back from the API
        .done(function(response) {
// Storing an array of results in the results variable
          var results = response.data;

// Looping over each result item
          for (var i = 0; i < results.length; i++) {

// Take action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
// Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

// Store the result item's rating
              var rating = results[i].rating;

// Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

// Creating an image tag
              var still = results[i].images.fixed_height.url;
              var animated = results[i].images.fixed_height_still.url;
              var sportImage = $("<img>");
// Giving the image tag an src attribute of a property pulled from the result item
              sportImage.attr("src", results[i].images.fixed_height.url);

//Appending the paragraph and sportImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(sportImage);

//Prepending the gifDiv to the "#sportsGif" div in the HTML
              $("#sportsGifs").prepend(gifDiv);
            }
          }
        });
    });

//Make them still/animated with an on.("click") event

//data-still when i hit api, data-animate, data-state, 