define(["jquery"], function($) {
 
  $("li").click(function() {
    var genre = $(this).text();
    var action = $("#action").text();
    var adventure = $("#adventure").text();
    var comedy = $("#comedy").text();
    var crime = $("#crime").text();
    var drama = $("#drama").text();
    var horror = $("#horror").text();
    var scienceFiction = $("#science-fiction").text();
    var thriller = $("#thriller").text();

    var movieList = $(".movies");
    movieList.each(function() {
      if (genre === $(this).find(".genre")) {
         $(this).show();
      }else {
        $(this).hide();
      }
    });
  });
});