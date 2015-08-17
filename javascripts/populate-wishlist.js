define(function(){
  return function(movieId){
      $.ajax({
        url:"http://www.omdbapi.com/?i=" + movieId,
        method: "GET"
      }).done(function(data){
        console.log("done fired");
        console.log(data);

        data.poster = "http://img.omdbapi.com/?i=" + data.imdbID + "&apikey=8513e0a1";
        data.rating = 0;
        data.watched = false;
        data.wishlist = true;
        console.log("done");
        $.ajax({
          url: "https://movie-history-redo.firebaseio.com/movies.json",
          method: "POST",
          data: JSON.stringify(data)
        }).done(function(){
          console.log("loaded to firebase");
        });
      });
  };
});