requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'

    }
  }
});

requirejs(["jquery", "lodash", "hbs", "bootstrap", "firebase", "show-wishlist", "removeMovie"], 
  function($, _, Handlebars, bootstrap, _firebase, showWishlist, removeMovie) {
  
  var myFirebaseRef = new Firebase("https://movie-history-redo.firebaseio.com/movies");
  myFirebaseRef.on("value", function(snapshot) {
    var films = snapshot.val();

    var moviesArray = [];
    for (var key in films) {
      moviesArray[moviesArray.length] = films[key];
    }

    var moviesObj = {
      movies: moviesArray
    };

    require(['hbs!../templates/movies'], 
      function(moviesTemplate) {
      $("#movie-containers").html(moviesTemplate({movies: films}));

        ///styling effects for movie containers ////
          $('.movie-info').on('mouseover', function(){
              $(this).addClass('shadow'); 
            });
          $('.movie-info').on('mouseout', function(){
            $(this).removeClass('shadow');
          });
    });
  });
  $(document).on("click", ".add-button", function(){
    showWishlist();
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
        data.watched=false;
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
  });
  
  
  
  $('#movie-containers').on("click",".delButton", function() {
     var retVal = confirm("This will delete this movie. Click ok to continue");
     if (retVal === true) {
       var getKey = $(this).closest(".movies").attr("data-key");
       removeMovie.deleteMovie(getKey);     
     } else {
       return false;
       }
 });

 

  




});

