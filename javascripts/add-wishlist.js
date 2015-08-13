define(function(){
  return function(){
      var userInput = $('.form-control').val();
      console.log(userInput);
      $.ajax({
        url:"http://www.omdbapi.com/?s=" + userInput,
        method: "GET"
      }).done(function(data){
//        data.userRating = 0;
//        data.watched = false;
//        data.poster = "http://img.omdbapi.com/?i=" + data.imdbID + "&apikey=8513e0a1";
//        console.log(data);
//        $.ajax({
//          url: "https://movie-history-redo.firebaseio.com/movies.json",
//          method: "POST",
//          data: JSON.stringify(data)
//        }).done(function(){
//          console.log("loaded to firebase");
//        });
      });
    };
});