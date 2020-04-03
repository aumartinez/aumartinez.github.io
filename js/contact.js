//Form validation

$(document).ready(function(){
  //To do
  var url = $("#contact-form").attr("action");
  
  $("#contact-form").submit(function(evt){
    $(".loader").addClass("active");
    
    var errors = validateForm();
    
    if (errors.length == 0) {
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
    if($("#name").val().length == 0) {
      arr.push("name");
    }
    if ($("#email").val().length == 0) {
      arr.push("email");
    }
    if ($("#message").val().length == 0) {
      arr.push("message");
    }
    if ($("#g-recaptcha-response").val().length == 0) {
      $(".g-recaptcha").next().addClass("active");
    }
    
    return arr;
  }
  
  function displayErrors(errors) {
    for (var i = 0; i < errors.length; i++) {
      $("#" + errors[i]).next().addClass("active");
    }
    
    $("#error-div").addClass("active");
    $("#error-div").text("Errors found!");
  }
  
  function removeErrors() {
    $(".error-mess.active").removeClass("active");
  }
  
});