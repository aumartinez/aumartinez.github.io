//Form validation

$(document).ready(function(){
  //To do
  var url = $("#contact-form").attr("action");
  
  $("#contact-form").submit(function(evt){
    $(".loader").addClass("active");
    
    var errors = validateForm();
    
    if (errors.length == 0) {      
      evt.preventDefault();
      
      var data = {
        "name" : $("#name").val(),
        "email" : $("#email").val(),
        "message" : $("#message").val(),
        "g-recaptcha-response" : $("#g-recaptcha-response").val()
      }
      
      var posting = $.post(url , data);
      posting.done(function(response){
        var str = response.message;
        $("#success-div").text(str);
        removeValues();
        $(".loader").removeClass("active");
      });
      
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
      errors.push("recaptcha");
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
    $(".err-mess.active").removeClass("active");
  }
  
  function removeValues() {
    $("#name").val() == "";
    $("#email").val() == "";
    $("#message").val() == "";
    $("#g-recaptcha-response").val() == "";
  }
  
});