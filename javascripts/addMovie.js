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
        var movieObj = {
          "title": data.Title,
          "year": data.Year,
          "actors": data.Actors,
          "rating": userRating,
          "watched": true
        };

        $.ajax({
          url: "https://moviehistory.firebaseio.com/movies.json",
          method: "POST",
          data: JSON.stringify(movieObj)
        }).done(function(){
            location.reload();
          });
      });
    });
  });
});

