<?php

class Form {
  
  private $url;
  private $errors = array();
  
  public function __construct() {
    $this->url = $_SERVER["HTTP_REFERER"];
    $this->errors = array();
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
                "message"
                );
                
    foreach ($required as $value) {
      if(!isset($_POST[$value]) || $_POST[$value] == "") {
        $this->errors[] = ucfirst($value) . " is required";
      }
    }
    
    $this->error_check();    
  }
  
  public function error_check() {    
    echo json_encode($this->errors, JSON_FORCE_OBJECT);    
  }
}

$form = new Form();
$form->validate_url();
$form->validate_required();

?>