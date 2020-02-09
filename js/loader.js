"use strict";

var rotate;
var loader = function(rotate) {
  var div = document.createElement("div");
  
  div.style.position = "fixed";
  div.style.backgroundColor = "rgba(0,0,0,0.7)";
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.zIndex = 999;
  div.style.overflow = "hidden";
   
  document.getElementsByTagName("body")[0].appendChild(div);
  
  var spin = document.createElement("div");
  
  spin.style.height = "100px";
  spin.style.width = "100px";  
  spin.style.position = "absolute";
  spin.style.left = 0;
  spin.style.right = 0;
  spin.style.marginLeft = "auto";
  spin.style.marginRight = "auto";
  spin.style.top = "35%";
  spin.style.borderTop = "solid 10px transparent";
  spin.style.borderLeft = "solid 10px #fff";
  spin.style.borderRight = "solid 10px #fff";
  spin.style.borderBottom = "solid 10px #fff";
  spin.style.borderRadius = "50%";
  
  document.getElementsByTagName("div")[0].appendChild(spin);
  
  var time = 10;
  var deg = 0;
  var inc = 5;
  
  rotate = setInterval(
    function(){
      spin.style.transform = "rotate(" + deg + "deg)";
      deg += inc;      
    }
  , time);
  
  return rotate;
};

function stopLoader() {
  clearInterval(loader(rotate));
  var div = document.getElementsByTagName("div")[0];
  div.parentNode.removeChild(div);
}

loader();

window.addEventListener("load", stopLoader, false);