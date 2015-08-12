function getJSON(url, cb) {
 console.log(url);

 JSONP_PROXY = 'https://jsonp.afeld.me/?url='
 // THIS WILL ADD THE CROSS ORIGIN HEADERS

 var request = new XMLHttpRequest();
 request.open('GET', JSONP_PROXY + url);

 request.onload = function() {
   if (request.status >= 200 && request.status < 400) {
     cb(JSON.parse(request.responseText));
   }
 };

    request.send();
}


define(["jquery"], function($){
  $(document).ready(function() {
    $("button").click(function(e) {
      e.preventDefault();
      var userInput = $("#userInput").val();
      var userRating = $("#userRating").val();
      console.log(userInput, userRating);

      $.ajax({
        url: "http://www.omdbapi.com/?t=" + userInput,
      }).done(function(data){

        var getPoster = getJSON(data.Poster, function(newPoster) {
          getPoster = newPoster;
          console.log(newPoster);
        })

        console.log(data);
        var watched;
        if($("#watch").is(":checked")) {
          watched = true;
        }
        if($("#notWatch").is(":checked")) {
          watched = false;
        } 
        var movieObj = {
          "title": data.Title,
          "year": data.Year,
          "actors": data.Actors,
          "rating": userRating,
          "watched": watched,
          "poster": getPoster
        };

        if (userInput === "") {
          alert("Please enter a movie title");
        }
        else if((userRating < 1  || userRating > 10) || userRating === "") {
           alert("Please enter a number from 1 - 10");
        }
        else if ($("#watch").prop("checked") === false && $("#notWatch").prop("checked") === false) {
          alert("Have you watched " + userInput + "?");
        }
        else {
          $.ajax({
            url: "https://moviehistory.firebaseio.com/movies.json",
            method: "POST",
            data: JSON.stringify(movieObj)
          }).done(function(){
              // location.reload();
            });
        }
      });
    });
  });
});

