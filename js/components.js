window.addEventListener("load", myLib, false);
window.addEventListener("load", themeSwitcher, false);
window.addEventListener("load", animatedList, false);

function animatedList() {
  var list = document.querySelector("#ani-list");
  var listItems = list.children;
  var str = [];
    
  for (var i = 0; i < listItems.length; i++) {
    str.push(listItems[i].innerText);    
  }
    
  var ind = 0; 
  var limit = listItems.length;
  
  listItems[ind].style.display = "inline-block";    
  var clock = (str[ind].length * 200);
  typer(listItems[ind], str[ind], clock);
  
  var loop = setInterval(
    function() {      
      ind++;
      if (ind == limit) {        
        listItems[limit - 1].style.display = "none";
        ind = 0;
      }
      if (ind > 0) {
        listItems[ind - 1].style.display = "none";
        listItems[ind - 1].innerText = str[ind - 1];
      }
      listItems[ind].style.display = "inline-block";      
      typer(listItems[ind], str[ind], clock);
    }
  , clock);
  
 function typer(elem, liStr, clock) {    
    var typeStr = "";
    var i = 0;
    
    elem.innerText = "";
    
    var timer = Math.floor(clock / liStr.length * 0.5);
    
    var typeForward = setInterval(
     function() {
       if (i == liStr.length) {
         clearInterval(typeForward);
         elem.innerText = liStr;
         typePause(elem, liStr, clock);
       }
       else {
         typeStr += liStr[i];
         elem.innerText = typeStr;
         i++;
       }
       
     }
    , timer);
  }
  
  function typePause(elem, liStr, clock) {    
    var timer = 20;
    var i = 0;
    
    var pause = setInterval(
      function() {
        if (i == timer) {
          clearInterval(pause);
          typeBack(elem, liStr, clock);
        }
        else {
          i++;
        }
      }
    , timer);
  }

  function typeBack(elem, liStr, clock) {
    var typeStr = liStr;
    elem.innerText = typeStr;
    
    var timer = Math.floor(clock / liStr.length * 0.4);
    
    var typeBackwards = setInterval(
    function() {
      if (typeStr.length == 0) {
        clearInterval(typeBackwards);
      }
      typeStr = typeStr.substring(0, typeStr.length - 1);
      elem.innerText = typeStr;
    }
    , timer);
  }
}

function themeSwitcher() {
  var themeIs = "off";
  var switchControls = document.querySelectorAll(".theme-switch .slider");
  
  addEventListenerToList(switchControls, "click", function() {themeChange(event);});
    
  function themeChange(evt) {
    themeIs = themeIs == "off" ? "on" : "off";    
    themeIs == "on" ? addCSS() : removeCSS();   
  }
  
  function addCSS() {
    let css = document.createElement("link");
    css.rel = "stylesheet";    
    css.href = "css/dark-theme.css";
    css.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(css);
  }
  
  function removeCSS() {
    var head = document.getElementsByTagName("head")[0];
    head.removeChild(head.lastChild);
  }
}

function myLib() {  
  var elems = document.querySelectorAll("body *");
   
  //activeMenu();
  
  //Filter elements  
  var linkElems = filterElems(elems, "data-animate", "link-scroll");
  var menu = filterElems(elems, "data-animate", "navbar-scroll");
  var menuElems = pullMenuElems(menu);
  var countElems = filterElems(elems, "data-animate", "counter");  
  var activeElems = filterElems(elems, "data-toggle", "active");  
  var hoverElems = filterElems(elems, "data-animate", "hover");
  var typeElems = filterElems(elems, "data-animate", "type");
  var typeRevElems = filterElems(elems, "data-animate", "typerev");
  var inviewElems = filterElems(elems, "data-animate", "inview");
  var inviewOnceElems = filterElems(elems, "data-animate", "once");
  
  var elemPosY = [];
  var elemH = [];
  var treshold = 1;
        
  //Add listeners  
  addEventListenerToList(linkElems, "click", function(){smoothScroll(event);});
  addEventListenerToList(activeElems, "click", function(){toggleClass(event);});
  addEventListenerToList(menuElems, "click", function(){smoothScroll(event);});  
  addEventListenerToList(hoverElems, "mouseover", function(){activeState(event);});
  addEventListenerToList(hoverElems, "mouseout", function(){inactiveState(event);});
  addEventListenerToList(inviewOnceElems, "inview", function(){activeState(event);});
  addEventListenerToList(inviewElems, "inview", function(){activeState(event);});
  addEventListenerToList(inviewElems, "outofview", function(){inactiveState(event);});
  addEventListenerToList(typeElems, "inview", function(){typeIt(event);});
  addEventListenerToList(typeRevElems, "inview", function(){typeRev(event);});
  
  //Initial status on page refresh  
  (inviewOnceElems.length > 0) ? inView(inviewOnceElems, treshold) : false;
  (countElems.length > 0) ? inView(countElems, treshold) : false;
  (typeElems.length > 0) ? inView(typeElems, treshold) : false;
  (typeRevElems.length > 0) ? inView(typeRevElems, treshold) : false;
  (inviewElems.length > 0) ? inView(inviewElems, treshold) : false;
    
  //Window listeners  
  window.addEventListener("scroll", function(){inView(inviewOnceElems, treshold);}, false);
  window.addEventListener("scroll", function(){inView(countElems, treshold);}, false);
  window.addEventListener("scroll", function(){inView(typeElems, treshold);}, false);   
  window.addEventListener("scroll", function(){inView(inviewElems, treshold);}, false);
  
  function pullMenuElems(elems) {
    var arr = [];
    for (var i = 0; i < elems.length; i++) {
      arr = elems[i].querySelectorAll("a");    
    }  
    return arr;
  }
  
  function activeMenu() {
    var activeWin = window.location.href;
    var menu = document.querySelector("ul.navbar-nav");
    var menuItems = menu.children;
    var activeItem;
     
    activeWin = activeWin.split("/");
    activeWin = activeWin[activeWin.length - 1];
              
    if (activeWin.indexOf("#") != -1) {
      activeWin = activeWin.substring(activeWin.indexOf("#") + 1);
    }
      
    if (menu) {
      var menuLinks = menu.querySelectorAll("a");
        
      for (var i = 0; i < menuLinks.length; i++) {
        var str = menuLinks[i].getAttribute("href");
        str = str.split("/");
        str = str[str.length - 1];
          
        if (str.indexOf("#") != 1) {
          str = str.substring(str.indexOf("#") + 1);  
        }
          
        if (str == activeWin) {
          activeItem = menuLinks[i];
        }
          
      }  
        
      for (var i = 0; i < menuItems.length; i++) {
        removeClass(menuItems[i], "active");
        if (activeWin == "") {
          addClass(menuItems[i], "active");
          return;
        }
        if (menuItems[i].contains(activeItem)){
          addClass(menuItems[i], "active");
        }
      }
        
    }
  }
  
  //Animate + change state functions
  function inView(elems, treshold) {
    var curr;
    var evt;
    var zone;
    
    for (var i = 0, len = elems.length; i < len; i++) {      
      elemH[i] = elems[i].getBoundingClientRect().height * treshold;
      elemPosY[i] = elems[i].getBoundingClientRect().top + document.documentElement.scrollTop;            
      curr = window.innerHeight + document.documentElement.scrollTop;
      zone = elemH[i] + elemPosY[i];
      
      if (curr > elemPosY[i] && document.documentElement.scrollTop < zone) {
        //Elem is in the current view            
        evt = createNewEvent("inview");
        elems[i].dispatchEvent(evt);
      }      
      else {
        evt = createNewEvent("outofview");
        elems[i].dispatchEvent(evt);
      } 
    }
        
  }

  function smoothScroll(evt) {
    evt.preventDefault();
        
    var startElem = evt.currentTarget;  
    
    if(!startElem.getAttribute("href")){
      return;
    }
      
    var id = startElem.getAttribute("href").match(/#/g);
    
    // If href is not an ID but an URL, open URL instead
    if(!id) {    
      var name = "_self";    
      if (startElem.getAttribute("target")) {
        name = startElem.getAttribute("target");
      }    
      var url = startElem.getAttribute("href");
      
      return window.open(url, name);
    }
    
    id = startElem.getAttribute("href");  
    id = id.substring(id.indexOf("#") + 1);
    var targetElem = document.getElementById(id);  
    var startPos = Math.round(startElem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop));
    var targetPos = Math.round(targetElem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop));  
    var len = Math.abs(startPos - targetPos);
    
    //Can play with timeinterval and parts, total animation timing is: time * parts
    var timeinterval = 10;
    var parts = 80;
    
    var inc = Math.round(len / parts);
    var sum = 0;
      
    var url = window.location.href;  
    url = url.substring(0, url.indexOf("#"));  
    url += "#" + id;    
    
    var scrollFunc = setInterval(
      function() {
        if (Math.abs(sum) >= len) {        
          clearInterval(scrollFunc);        
          return window.open(url, "_self"), activeMenu();
        }
        
        window.scrollTo(0, (startPos + sum));
        
        if (startPos > targetPos) {
          sum -= inc;        
        } 
        else {
          sum += inc;
        }
        
      }, timeinterval);
      
  }

  function animateCounter(evt) {
    var elem = evt.currentTarget;
    var numb = parseInt(elem.innerText);
    
    //Can play with timeinterval and parts, animation duration is equals to: time * parts
    var timeinterval = 50;
    var parts = 25;
    
    var inc = Math.round(numb / parts);
    var sum = 0;
    
    //Check if element has "counting" class
    var arr = elem.className.split(" ");
    var ind = arr.indexOf("counting");
    
    //If element doesn't has "counting" class play animation
    if (ind == -1) {
      //Add a "counting" class to the element and start counter
      addClass(elem, "counting");
      var timer = setInterval(
        function(){
          if (sum >= numb) {          
            sum = numb;
            elem.innerText = sum;
            return clearInterval(timer);          
          }
          else{
            elem.innerText = sum;        
            sum += inc;
          }
        }, timeinterval);
    }
    else {
      return;
    }
  }

  function typeIt(evt) {
    var elem = evt.currentTarget;
    console.log(elem);
    var str = elem.innerText;  
    var span = document.createElement("span");  
    var thisStyles = getComputedStyle(elem, null);
    var spanWidth = (Math.round(parseInt(thisStyles.fontSize.replace("px"))/2)) + "px";
    var borderWidth = (Math.round(parseInt(thisStyles.fontSize.replace("px"))/5)) + "px"; 
        
    span.style.display = "inline-block";
    span.style.width = spanWidth;
    span.style.borderBottomStyle = "solid";
    span.style.borderBottomWidth = borderWidth;  
    span.style.marginLeft = "10px";

    var time = (str.length < 30)?100:50;
    var i = 0;
    var typeStr = "";
    elem.innerText = " ";
      
    var typer = setInterval(
      function() {
        if(i == str.length) {        
          elem.innerText = str;
          elem.appendChild(span);
          addClass(elem.lastElementChild, "ani-blink");
          clearInterval(typer);
        }
        else {
          typeStr += str[i];
          elem.innerText = typeStr;
          elem.appendChild(span);
          i++;
        }      
      }, time);
    
  }
}

//Helpers
function filterElems(elems, attribute, data) {
  var arr = [];
  for (var i = 0; i < elems.length; i++) {
    if (elems[i].getAttribute(attribute) === data) {
      arr.push(elems[i]);
    }
  }
  return arr;
}

function addEventListenerToList(list, evt, func) {
  var arr = list;
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener(evt, func, false);
    }
  }
}

function addEventListenerToListOnce(list, evt, fn) {  
  var arr = list;
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      var func = function() {
        arr[i].removeEventListener(evt, func, false);
        fn();
      };
      arr[i].addEventListener(evt, func, false);
    }
  }
}

function callOnce(func) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      return func();
    }
    else {
      return;
    }
  }
}

function createNewEvent(evtName) {
  var evt;
  if (typeof Event === "function") {
    evt = new Event(evtName);
  }
  else {
    evt = document.createEvent("Event");
    evt.initEvent(evtName, true, true);
  }
  return evt;
}

function addClass (elem, myClass) {
  if (elem.clasList) {
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
  if (elem.clasList) {
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
  
function toggleClass(evt) {
  var elem = evt.currentTarget;
  var myClass = elem.getAttribute("data-toggle");
    
  if (elem.getAttribute("data-target")) {
    var elems = [];
    elems = document.querySelectorAll(elem.getAttribute("data-target"));
      
    if (elems.length > 0) {
      for (var i = 0; i < elems.length; i++) {
        if (elems[i].classList) {
          elems[i].classList.toggle(myClass);
          var evt = createNewEvent("active");
          elems[i].dispatchEvent(evt);
        }
        else {
          var arr = elems[i].className.split(" ");
          var ind = arr.indexOf(myClass);
            
          if (ind >= 0) {
            arr.splice(ind, 1);
          }
          else {
            arr.push(myClass);
            elems[i].className = arr.join(" ");
            var evt = createNewEvent("active");
            elems[i].dispatchEvent(evt);
          }
        }
      }
    }
      
    return;
  }
    
  else if (elem.classList) {
    elem.classList.toggle(myClass);
  }
    
  else {
    var arr = elem.className.split(" ");
    var i = arr.indexOf(myClass);
      
    if (i >= 0) {
      arr.splice(i, 1);
    }
    else {
      arr.push(myClass);
      elem.className = arr.join(" ");
    }
  }
}
  
function activeState(evt) {
  var elem = evt.currentTarget;
  var myClass = "active";
    
  return addClass(elem, myClass);
}

function inactiveState(evt) {
  var elem = evt.currentTarget;
  var myClass = "active";
    
  return removeClass(elem, myClass);
}

function elemObserver(elem, treshold) {
  
}