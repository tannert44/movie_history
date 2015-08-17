requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'bootstrap-rating': '../bower_components/bootstrap-rating/bootstrap-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'bootstrap-rating': ['bootstrap'],
    'firebase': {
      exports: 'Firebase'

    }
  }
});


requirejs(["jquery", "lodash", "hbs", "bootstrap", "bootstrap-rating", "firebase", "show-wishlist", "populate-wishlist","removeMovie", "search"], 
  function($, _, Handlebars, bootstrap, bootRate, _firebase, showWishlist, popWishlist, removeMovie, searchMovies) {
  
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
    
    searchMovies(moviesArray);
    
    require(['hbs!../templates/movies'], 
      function(moviesTemplate) {
        $("#movie-containers").html(moviesTemplate({movies: films}));
        $('.movies[watched="true"]').hide();
        $('.rating').rating();
        ///styling effects for movie containers ////
        $('.movie-info').on('mouseover', function(){
          $(this).addClass('shadow'); 
        });
        $('.movie-info').on('mouseout', function(){
          $(this).removeClass('shadow');
        });
    });
  });

  $(document).on("click", ".search-button", function(){
    showWishlist();
  });
  
  

  $('#movie-containers').on("click",".delButton", function() {
     var getKey = $(this).closest(".movies").attr("data-key");
       removeMovie.deleteMovie(getKey);   

  });

  $("#movie-containers").on("click", ".addtowatched", function() {
//var getKey = $(this).closest(".movies").attr("data-key");
  console.log($(this));  
   // var getKey = $(this).closest(".movies").attr("data-key");
  var dataKey = $(this).attr("data-key");
  console.log(dataKey);
  var myFirebaseRef = new Firebase("https://movie-history-redo.firebaseio.com/movies/" + dataKey);
    myFirebaseRef.update({watched: true, wishlist: false});


  //$(this).closest($(".wishlist")).addClass("watched").removeClass("wishlist");
  
  console.log("Changed to watched");
    });

$("#movie-containers").on("click", ".addtowishlist", function() {
  //var getKey = $(this).closest(".movies").attr("data-key");
  console.log($(this));  
  popWishlist();
    var dataKey = $(this).attr("data-key");
console.log(dataKey);
  var myFirebaseRef = new Firebase("https://movie-history-redo.firebaseio.com/movies/" + dataKey);
    myFirebaseRef.update({wishlist: true});

  //$(this).closest($(".wishlist")).addClass("watched").removeClass("wishlist");
  
  console.log("Changed to watched");
    });



//Watched button in NavBar
  $(".watchedbtn").on("click", function() {
    $('.movies[watched="true"]').show();
    $('.movies[watched="false"]').hide();


});
  /*$('.movies[watched="false"]').hide();

  $(".wishlistbtn").on("click", function() {
    $(".movies").each(function() {
       $('.movies[watched="true"]').css('display', 'none');
    });



    });

  });
*/
});
