define(["jquery"], function($){
  $(document).ready(function() {
    $.ajax({
      url: "http://www.omdbapi.com/?",
      method: "POST",
      data: JSON.stringify(list)
    }).done(function(addSong){
        location.reload();
      });
    });
  });
});