<?php

class Form {
  
  private $url;
  private $errors = array();
  private $error_count;
  private $sanitized = array();
  
  private $name;
  private $email;
  private $message;
  
  public function __construct() {    
    header("Access-Control-Allow-Origin: https://aumartinez.github.io");
    header("Content-Type: application/json");
    
    $this->url = $_SERVER["HTTP_REFERER"];
    $this->errors = array();
    $this->error_count = 0;
  }
  
  public function validate_url() {
    if (!$this->url == "https://aumartinez.github.io/") {
      header("Location: https://aumartinez.github.io/#contact");
      exit("Forbidden");
    }    
  }
  
  public function validate_required() {
    $required = array(
                "name",
                "email",
                "message",
                "g-recaptcha-response"
                );
    
    foreach ($required as $value) {
      if(!isset($_POST[$value]) || $_POST[$value] == "") {
        $this->error_count++;
        $this->errors["error-" . $this->error_count] = ucfirst($value) . " is required";        
      }
    }
    
    $this->error_check();    
  }
  
  public function validate_email() {
    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
      $this->error_count++;
      $this->errors["error-" . $this->error_count] = "Email is invalid";
    }
    
    $this->error_check();
  }
  
  public function sanitize() {
    $_POST = $this->stripslashes_deep($_POST);
    
    foreach ($_POST as $key => $value) {
      $this->sanitized[$key] = trim($value);
      $this->sanitized[$key] = strip_tags($value);
      $this->sanitized[$key] = htmlspecialchars($value);
    }
  }
  
  public function submit() {
    $this->name = $this->sanitized["name"];
    $this->email = $this->sanitized["email"];
    $this->message = $this->sanitized["message"];
    
    $emailbody = '
      <!doctype html>
      <html>
        <head>
          <title>Email alert</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; margin: 60px auto; width: 600px">
            <h3 style="text-align: center">
              New message received
            </h3>
            
            <hr />
            
            <p>
              From: '. $this->name .'
            </p>
            
            <p>
              Email contact: '. $this->email . '
            </p>
            
            <p>
              Message: '. $this->message .'
            </p>            
          </div>
        </body>
      </html>';
      
    $to = "acm_asd@hotmail.com";
    $subject = "New message received";
    $txt = $emailbody;
    $headers = array(
                "MIME-Version: 1.0",
                "Content-type:text/html;charset=UTF-8",
                "From: no-reply@aumartinez.github.io",
                "Reply-To: no-reply@aumartinez.github.io",
                "X-Mailer: PHP/".PHP_VERSION
                );
                
    $headers = implode("\r\n", $headers);
    $sendemail = mail($to, $subject, $txt, $headers);
    
    return true;
  }
  
  public function response() {
    $this->name = $this->sanitized["name"];
    $this->email = $this->sanitized["email"];
    
    $emailbody = '
      <!doctype html>
      <html>
        <head>
          <title>Email alert</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; margin: 60px auto; width: 600px">
            <h3 style="text-align: center">
              Your message was successfully submitted
            </h3>
            
            <hr />
            
            <p>
              Hi, '. $this->name .',
            </p>
            <p>Thanks for reaching out ,I\'ll get back to you shortly.
            </p>
            <p>
              Regards,
            </p>
            
            <div style="padding-top: 5px; padding-bottom: 5px; padding-left: 40px; border-left: 3px solid #000">
              <h4 style="font-style: italic;">
                Augusto Martinez Rivas
              </h4>
              <p>
                Web developer <br />
                AM\CodeCraft
              </p>
            </div>
          </div>
        </body>
      </html>';
      
    $to = $this->email;
    $subject = "Your message was received";
    $txt = $emailbody;
    $headers = array(
                "MIME-Version: 1.0",
                "Content-type:text/html;charset=UTF-8",
                "From: no-reply@aumartinez.github.io",
                "Reply-To: no-reply@aumartinez.github.io",
                "X-Mailer: PHP/".PHP_VERSION
                );
                
    $headers = implode("\r\n", $headers);
    $sendemail = mail($to, $subject, $txt, $headers);
    
    return true;
  }
  
  public function success() {
    $mess = array();
    $mess["message"] = "Information was successfully submitted";
    echo json_encode($mess, JSON_FORCE_OBJECT);
  }
  
  public function error_check() {
    if(count($this->errors) > 0) {
      echo json_encode($this->errors, JSON_FORCE_OBJECT);      
    }
  }
  
  private function stripslashes_deep($value) {    
    $value = is_array($value) ? array_map(array($this, "stripslashes_deep"), $value) : stripslashes($value);
    
    return $value;
  }
}

$form = new Form();
$form->validate_url();
$form->validate_required();
$form->validate_email();
$form->sanitize();
$form->submit();
$form->response();
$form->success();

?>
