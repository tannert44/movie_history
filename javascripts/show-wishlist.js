define(function(){
  return function(){
      var userInput = $('.form-control').val();
      console.log(userInput);
      $.ajax({
        url:"http://www.omdbapi.com/?s=" + userInput,
        method: "GET"
      }).done(function(data){
        console.log("done fired");
        console.log(data);
        $.each(data.Search, function(index, value){
          console.log(value);
          value.poster = "http://img.omdbapi.com/?i=" + value.imdbID + "&apikey=8513e0a1";
          console.log(value);
          
        });
        console.log(data.Search);
        require(['hbs!../templates/movies'], function(moviesTemplate){
            $('#movie-containers').html(moviesTemplate({movies: data.Search}));
          });
        
      });
    };
});