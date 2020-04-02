//Form validation

$(document).ready(function(){
  //To do
  var url = $("#contact-form").attr("action");
  
  $("#contact-form").submit(function(evt){
    $(".loader").addClass("active");
    
    var errors = validateForm();
    
    if (errros.length == 0) {
      $.post(url);
      removeValues();
    }
    else {
      removeErrors();
      displayErrors(errors);
      evt.preventDefault();
      $(".loader").removeClass("active");
    }
  });
  
  function validateForm(){
    var arr = [];
    
    //Required
    
  }
});