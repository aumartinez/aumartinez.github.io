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
  var timer = 3000;
  addClass(listItems[ind], "active");
  
  var loop = setInterval(
    function() {
      ind++;
      if (ind > 0) {
        removeClass(listItems[ind - 1], "active");
      }
      addClass(listItems[ind], "active");
    }
  , timer);  
  
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