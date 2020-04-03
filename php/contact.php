<?php

class Form {
  
  private $url;
  private $errors = array();
  private $error_count;
  
  public function __construct() {
    $this->url = $_SERVER["HTTP_REFERER"];
    $this->errors = array();
    $this->error_count = 1;
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
        $this->errors["error-" . $this->error_count] = ucfirst($value) . " is required";
        $this->error_count++;
      }
    }
    
    $this->error_check();    
  }
  
  public function submit() {
    
  }
  
  public function error_check() {    
    echo json_encode($this->errors, JSON_FORCE_OBJECT);    
  }
}

$form = new Form();
$form->validate_url();
$form->validate_required();

?>