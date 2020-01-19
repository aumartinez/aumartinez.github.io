window.addEventListener("load", run, false);

function run() {  
  var elems = document.querySelectorAll("body *");
  
  activeMenu();
  
  //Filter elements
  var scrollElems = filterElems(elems, "data-animate", "scroll");
  var linkElems = filterElems(elems, "data-animate", "link-scroll");
  var menu = filterElems(elems, "data-animate", "navbar-scroll");
  var menuElems = pullMenuElems(menu);
  var countElems = filterElems(elems, "data-animate", "counter");  
  var activeElems = filterElems(elems, "data-toggle", "active");  
  var hoverElems = filterElems(elems, "data-animate", "hover");
  var typeElems = filterElems(elems, "data-animate", "type");
      
  //Add listeners  
  addEventListenerToList(linkElems, "click", function(){smoothScroll(event);});
  addEventListenerToList(activeElems, "click", function(){toggleClass(event);});
  addEventListenerToList(menuElems, "click", function(){smoothScroll(event);});  
  addEventListenerToList(hoverElems, "mouseover", function(){activeState(event);});
  addEventListenerToList(hoverElems, "mouseout", function(){inactiveState(event);});    
  addEventListenerToList(countElems, "scrolled", function(){animateCounter(event);});
  
  addEventListenerToListOnce(typeElems, "scrolled", function(){typeIt(event);});  
    
  //Initial status on page refresh
  (scrollElems.length > 0)?getPos(scrollElems):false;
  (countElems.length > 0)?getPos(countElems):false;
  (typeElems.length > 0)?getPos(typeElems):false;
  
  //Window listeners
  window.addEventListener("scroll", function(){getPos(scrollElems);}, false);
  window.addEventListener("scroll", function(){getPos(countElems);}, false);
  window.addEventListener("scroll", function(){getPos(typeElems);}, false);  
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

  function pullMenuElems(elems) {
    var arr = [];
    for (var i = 0; i < elems.length; i++) {
      arr = elems[i].querySelectorAll("a");    
    }  
    return arr;
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

  function activeMenu() {
    var curr = "";  
    curr = window.location.href;
    
    var menu = document.querySelector("ul.navbar-nav");
    var menuParents = menu.children;
    var menuItems = [];  
    var activeItem;
    
    curr = curr.split("/");
    curr = curr[curr.length - 1];
    if(curr.match("#")){
      curr = curr.split("#");
    }
    
    if(menu){
      menuItems = menu.querySelectorAll("a");
      
      for(var i = 0; i < menuItems.length; i++) {
        var str = menuItems[i].getAttribute("href");
        str = str.split("/");
        str = str[str.length - 1];
        
        if(typeof curr == "string"){
          if (str == curr){
            activeItem = menuItems[i];          
          }
        }
        if(typeof curr == "object"){
          str = str.split("#");        
          if (str[1] == curr[1] || str[0] == curr[0]){
            activeItem = menuItems[i];
          }
        }
        
      }  
      
      for(var i = 0; i < menuParents.length; i++) {
        removeClass(menuParents[i], "active");
        if(menuParents[i].contains(activeItem)){
          addClass(menuParents[i], "active");
        }
      }
      
    }
  }

  //Animate + change state functions

  function getPos(elems) {  
    var elemPos = [];
    var curr = [];
    
    for (var i = 0; i < elems.length; i++) {
      if (window.scrollY) {
        elemPos[i] = elems[i].getBoundingClientRect().top + window.scrollY;
        curr[i] = window.innerHeight + window.scrollY;
      }
      else{
        elemPos[i] = elems[i].getBoundingClientRect().top + document.documentElement.scrollTop;
        curr[i] = window.innerHeight + document.documentElement.scrollTop;
      }
      if (curr[i] > (elemPos[i] + (elems[i].offsetHeight / 4))) {
        addClass(elems[i], "active");
        var evt = createNewEvent("scrolled");
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
    
    id = startElem.getAttribute("href").replace("#","");  
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

  function typeIt(evt) {
    var elem = evt.currentTarget;
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