define(["firebase"],function(_firebase) {
 return {
   deleteMovie: function(argument) {
    console.log(argument);
     var ref = new Firebase("https://movie-history-redo.firebaseio.com/movies/" + argument);
     ref.remove();
     location.reload();
   }
 };
});