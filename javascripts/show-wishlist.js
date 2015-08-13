define(function(){
  return function(){
      var userInput = $('.form-control').val();
      console.log(userInput);
      $.ajax({
        url:"http://www.omdbapi.com/?s=" + userInput,
        method: "GET"
      }).done(function(data){
        
      });
    };
});