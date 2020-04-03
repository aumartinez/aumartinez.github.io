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
    var errors = [];
    
    //Required
    if($("#name").val().length == 0) {
      errors.push("name");
    }
    if ($("#email").val().length == 0) {
      errors.push("email");
    }
    if ($("#message").val().length == 0) {
      errors.push("message");
    }
    
    //Validate Captcha
    if ($("#g-recaptcha-response").val().length == 0) {
      $(".g-recaptcha").next().addClass("active");
    }
    
    //Validate email    
    var email = $("#email").val();
    var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var testEmail = regExp.exec(email);
    
    if (!testEmail) {
       errors.push("email");
    }
    
    return errors;
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