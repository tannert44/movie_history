define(["jquery"], function($) {
 
  $("li").click(function() {
    var genre = $(this).text();
    var movieList = $(".movies");
    movieList.each(function() {
      var genreList = $(this).find(".genre").text().split(": ")[1].split(", ");
      if (genreList.indexOf(genre) !== -1) {
         $(this).show();
      }else {
        $(this).hide();
      }
    });
  });
});