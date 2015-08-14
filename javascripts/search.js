define(function(moviesArray){
  return function(moviesArray){
    $(document).on("click", ".search-button", function(){
      var title = $('.form-control').val();
      // var length = title.length;
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
  };
});