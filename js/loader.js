//JS loader

let rotate;
let loader = function(rotate) {
  let div = document.createElement("div");
  
  div.style.position = "fixed";
  div.style.backgroundColor = "rgba(255,255,255,0.7)";
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.zIndex = 1;
  div.style.overflow = "hidden";
   
  document.getElementsByTagName("body")[0].appendChild(div);
  
  let spin = document.createElement("div");
  
  spin.style.height = "100px";
  spin.style.width = "100px";  
  spin.style.position = "absolute";
  spin.style.left = 0;
  spin.style.right = 0;
  spin.style.marginLeft = "auto";
  spin.style.marginRight = "auto";
  spin.style.top = "35%";
  spin.style.borderTop = "solid 10px #ccc";
  spin.style.borderLeft = "solid 10px #777";
  spin.style.borderRight = "solid 10px #777";
  spin.style.borderBottom = "solid 10px #777";
  spin.style.borderRadius = "50%";
  
  document.getElementsByTagName("div")[0].appendChild(spin);
  
  let time = 10;
  let deg = 0;
  let inc = 5;
  
  rotate = setInterval(
    function(){
      spin.style.transform = "rotate(" + deg + "deg)";
      deg += inc;      
    }
  , time);
  
  return rotate;
};

function stop() {
  clearInterval(loader(rotate));
  let div = document.getElementsByTagName("div")[0];
  div.parentNode.removeChild(div);
}

loader();

window.addEventListener("load", stop, false);