define(["firebase"],function(_firebase) {
 return {
   deleteMovie: function(argument) {
    console.log(argument);
     var ref = new Firebase("https://moviehistory.firebaseio.com/movies/" + argument);
     ref.remove();
     location.reload();
   }
 };
});