  requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash':'../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    },
    'floatThead': ['jquery']

  }
});
  requirejs(
  ["jquery","lodash","firebase","hbs","bootstrap"],
  function($, _,firebase,Handlebars,bootstrap){



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


$('.movie-info').on('mouseover', function(){
  $(this).addClass('shadow');
});
$('.movie-info').on('mouseout', function(){
  $(this).removeClass('shadow');
});


// $('.movie-info').on('click', function(){
//   $(this).toggleClass('shadow-click');
// });

});