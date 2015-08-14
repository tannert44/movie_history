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

requirejs(["jquery", "lodash", "hbs", "bootstrap", "firebase", "show-wishlist", "populate-wishlist","removeMovie"], 
  function($, _, Handlebars, bootstrap, _firebase, showWishlist, popWishlist, removeMovie) {
  
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
    
    $(document).on("click", ".search-button", function(){
      var title = $('.form-control').val();
      var length = title.length;
      // console.log('\\{'+input+'\\}'/g);
      var filterWishList = new RegExp(title);

      var titleArr = $('.movie-title');
      console.log(titleArr);

      $.each(titleArr, function(index, value){
        console.log(value);
        $(value).closest(".movies").hide();
      });

      $.each(moviesArray, function(index, value){
        // var matchingWords = value.match(/[A-Z][a-z]*/g);
        var thingy = value.Title.match(filterWishList);
        console.log(thingy);
        if(thingy!==null){

          $.each(titleArr, function(index, value2){
            console.log(value2.id);
            console.log(thingy.input);
            if(thingy.input === value2.id){
              console.log(value2);
              $(value2).closest(".movies").show();
            }
            // else{
            //   value2.parent().hide();
            // }
          });
          console.log("show");
        }else{
          console.log("hide");
          // value.hide();
          // $.each(titleArr, function(index, value){
          //   if(thingy.input === value){
          //     value.parent().hide();
          //   }
          // });
        }
      });
      // console.log(input);
      // console.log(matchingWords);
    });
    
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
  });
  
  popWishlist();
  $(document).on("click", ".done-button", function(){
    $('#myModal').modal('hide');
  });

  
  
  
  
  $('#movie-containers').on("click",".delButton", function() {
     var getKey = $(this).closest(".movies").attr("data-key");
       removeMovie.deleteMovie(getKey);   
     // var retVal = confirm("This will delete this movie. Click ok to continue");
     // if (retVal === true) {
        
     // } else {
     //   return false;
     //   }
  });

 

  




});

