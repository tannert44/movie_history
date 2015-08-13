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

requirejs(["jquery", "lodash", "hbs", "bootstrap", "firebase", "addMovie", "removeMovie","genreFilter"], 
  function($, _, Handlebars, bootstrap, _firebase, addMovie, removeMovie, genreFilter) {
  
  var myFirebaseRef = new Firebase("https://moviehistory.firebaseio.com/movies");
  myFirebaseRef.on("value", function(snapshot) {
    var films = snapshot.val();

    var moviesArray = [];
    for (var i in films) {
      moviesArray[moviesArray.length] = films[i];
    }

    var moviesObj = {
      movies: moviesArray
    };

    require(['hbs!../templates/movies'], 
      function(moviesTemplate) {
      $("#movie-containers").append(moviesTemplate({movies: films}));

        ///styling effects for movie containers ////
          $('.movie-info').on('mouseover', function(){
              $(this).addClass('shadow'); 
            });
          $('.movie-info').on('mouseout', function(){
            $(this).removeClass('shadow');
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

  $('#myModal').on('hidden.bs.modal', function () {
   location.reload();
 });

  $('.collapse').collapse();



  ///// mouseover, mouseout, click effects ///////////////////////////////////

  $('.sidebar-MyMovies').on('mouseover', function(){
    $(this).addClass('red');
  });

  $('.sidebar-MyMovies').on('mouseout', function(){
    $(this).removeClass('red');
  });

  $('.sidebar-MyMovies').on('click', function(){
    $(this).toggleClass('red2');
  });


  $('.sidebar-Shop').on('mouseover', function(){
    $(this).addClass('blue');
  });

  $('.sidebar-Shop').on('mouseout', function(){
    $(this).removeClass('blue');
  });

  $('.sidebar-Shop').on('click', function(){
    $(this).toggleClass('blue2');
  });


  $('h2').on('mouseover', function(){
    $(this).addClass('h2-weight');
  });
  $('h2').on('mouseout', function(){
    $(this).removeClass('h2-weight');
  });
});

