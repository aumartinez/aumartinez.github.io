//Typer
"use strict";

window.addEventListener("load", animatedList, false);

function animatedList() {
  var list = document.querySelector("#ani-list");
  var listItems = list.children;
  var str = [];
  
  for (var i = 0; i < listItems.length; i++) {
    str.push(listItems[i].innerText);    
  }
  var ind = 0;  
  var clock = str[ind].length * 200;
  
  listItems[ind].style.display = "inline-block";  
  
  function loop() {
    listItems[ind].innerText = "";
    typer(listItems[ind], str[ind]);
    setTimeout(
      function() {
        typer(listItems[ind], str[ind]);
        ind++;
        if (ind == listItems.length) {        
          listItems[ind - 1].style.display = "none";
          ind = 0;  
        }
          
        if (ind > 0) {
          listItems[ind - 1].style.display = "none";      
        }
        listItems[ind].style.display = "inline-block";
        
        requestAnimationFrame(loop); 
      }
    , clock);       
  }
  
  requestAnimationFrame(loop);
  
  var count = 0;
  
  function typer(elem, liStr) {
     
    if (count < liStr.length) {
      elem.innerText += liStr[count];
      count++;
      
      console.log(count);
      
      setTimeout(
        function(){
          typer(listItems[ind], str[ind]);
        }
      , 100);   
    }
  }
  
}

function addClass (elem, myClass) {
  if (elem.classList) {
    elem.classList.add(myClass);
  }
  else {
    var arr = elem.className.split(" ");
    var i = arr.indexOf(myClass);
    if (i == -1) {
      arr.push(myClass);
      elem.className = arr.join(" ");
    }
  }
}

function removeClass (elem, myClass) {
  if (elem.classList) {
    elem.classList.remove(myClass);
  }
  else {
    var arr = elem.className.split(" ");
    var i = arr.indexOf(myClass);
    if (i >= 0) {
      arr.splice(i, 1);
      elem.className = arr.join(" ");
    }
  }
}