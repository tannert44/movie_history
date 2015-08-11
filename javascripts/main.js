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

requirejs(["jquery", "lodash", "hbs", "bootstrap", "firebase", "addMovie"], 
  function($, _, Handlebars, bootstrap, _firebase, addMovie) {
  
  var myFirebaseRef = new Firebase("https://moviehistory.firebaseio.com/movies");
  myFirebaseRef.on("value", function(snapshot) {

  });
});

