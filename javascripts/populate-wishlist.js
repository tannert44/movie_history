define(function(){
  return function(){
      $(document).on("click", ".add-movie", function(){
      console.log("button clicked");
      var $titleModel = $(this).parent().attr("class");
      console.log($titleModel);
      $.ajax({
        url:"http://www.omdbapi.com/?t=" + $titleModel,
        method: "GET"
      }).done(function(data){
        console.log("done fired");
        console.log(data);

        data.poster = "http://img.omdbapi.com/?i=" + data.imdbID + "&apikey=8513e0a1";
        data.rating = 0;
        data.watched = false;
        data.wishlist = "wishlist";
        console.log("done");
        $.ajax({
          url: "https://movie-history-redo.firebaseio.com/movies.json",
          method: "POST",
          data: JSON.stringify(data)
        }).done(function(){
          console.log("loaded to firebase");
        });
      });
    });
  };
});