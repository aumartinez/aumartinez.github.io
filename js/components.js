window.addEventListener("load", run, false);

function run() {  
  let elems = document.querySelectorAll("body *");
  
  activeMenu();
  
  //Filter elements
  let scrollElems = filterElems(elems, "data-animate", "scroll");
  let linkElems = filterElems(elems, "data-animate", "link-scroll");
  let menu = filterElems(elems, "data-animate", "navbar-scroll");
  let menuElems = pullMenuElems(menu);
  let countElems = filterElems(elems, "data-animate", "counter");  
  let activeElems = filterElems(elems, "data-toggle", "active");  
  let hoverElems = filterElems(elems, "data-animate", "hover");
  let typeElems = filterElems(elems, "data-animate", "type");
      
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
    let arr = [];
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].getAttribute(attribute) === data) {
        arr.push(elems[i]);
      }
    }
    return arr;
  }

  function addEventListenerToList(list, evt, func) {
    let arr = list;
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener(evt, func, false);
      }
    }
  }

  function addEventListenerToListOnce(list, evt, fn) {  
    let arr = list;
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        let func = function() {
          arr[i].removeEventListener(evt, func, false);
          fn();
        };
        arr[i].addEventListener(evt, func, false);
      }
    }
  }

  function pullMenuElems(elems) {
    let arr = [];
    for (let i = 0; i < elems.length; i++) {
      arr = elems[i].querySelectorAll("a");    
    }  
    return arr;
  }

  function callOnce(func) {
    let called = false;
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
    let evt;
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
      let arr = elem.className.split(" ");
      let i = arr.indexOf(myClass);
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
      let arr = elem.className.split(" ");
      let i = arr.indexOf(myClass);
      if (i >= 0) {
        arr.splice(i, 1);
        elem.className = arr.join(" ");
      }
    }
  }

  function activeMenu() {
    let curr = "";  
    curr = window.location.href;
    
    let menu = document.querySelector("ul.navbar-nav");
    let menuParents = menu.children;
    let menuItems = [];  
    let activeItem;
    
    curr = curr.split("/");
    curr = curr[curr.length - 1];
    if(curr.match("#")){
      curr = curr.split("#");
    }
    
    if(menu){
      menuItems = menu.querySelectorAll("a");
      
      for(let i = 0; i < menuItems.length; i++) {
        let str = menuItems[i].getAttribute("href");
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
      
      for(let i = 0; i < menuParents.length; i++) {
        removeClass(menuParents[i], "active");
        if(menuParents[i].contains(activeItem)){
          addClass(menuParents[i], "active");
        }
      }
      
    }
  }

  //Animate + change state functions

  function getPos(elems) {  
    let elemPos = [];
    let curr = [];
    
    for (let i = 0; i < elems.length; i++) {
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
        let evt = createNewEvent("scrolled");
        elems[i].dispatchEvent(evt);
      }
    }
    
  }

  function smoothScroll(evt) {
    evt.preventDefault();
        
    let startElem = evt.currentTarget;  
    
    if(!startElem.getAttribute("href")){
      return;
    }
      
    let id = startElem.getAttribute("href").match(/#/g);
    
    // If href is not an ID but an URL, open URL instead
    if(!id) {    
      let name = "_self";    
      if (startElem.getAttribute("target")) {
        name = startElem.getAttribute("target");
      }    
      let url = startElem.getAttribute("href");
      
      return window.open(url, name);
    }
    
    id = startElem.getAttribute("href").replace("#","");  
    let targetElem = document.getElementById(id);  
    let startPos = Math.round(startElem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop));
    let targetPos = Math.round(targetElem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop));  
    let len = Math.abs(startPos - targetPos);
    
    //Can play with timeinterval and parts, total animation timing is: time * parts
    let timeinterval = 10;
    let parts = 80;
    
    let inc = Math.round(len / parts);
    let sum = 0;
      
    let url = window.location.href;  
    url = url.substring(0, url.indexOf("#"));  
    url += "#" + id;    
    
    let scrollFunc = setInterval(
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
    let elem = evt.currentTarget;
    let myClass = elem.getAttribute("data-toggle");
    
    if (elem.getAttribute("data-target")) {
      let elems = [];
      elems = document.querySelectorAll(elem.getAttribute("data-target"));
      
      if (elems.length > 0) {
        for (let i = 0; i < elems.length; i++) {
          if (elems[i].classList) {
            elems[i].classList.toggle(myClass);
            let evt = createNewEvent("active");
            elems[i].dispatchEvent(evt);
          }
          else {
            let arr = elems[i].className.split(" ");
            let ind = arr.indexOf(myClass);
            
            if (ind >= 0) {
              arr.splice(ind, 1);
            }
            else {
              arr.push(myClass);
              elems[i].className = arr.join(" ");
              let evt = createNewEvent("active");
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
      let arr = elem.className.split(" ");
      let i = arr.indexOf(myClass);
      
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
    let elem = evt.currentTarget;
    let numb = parseInt(elem.innerText);
    
    //Can play with timeinterval and parts, animation duration is equals to: time * parts
    let timeinterval = 50;
    let parts = 25;
    
    let inc = Math.round(numb / parts);
    let sum = 0;
    
    //Check if element has "counting" class
    let arr = elem.className.split(" ");
    let ind = arr.indexOf("counting");
    
    //If element doesn't has "counting" class play animation
    if (ind == -1) {
      //Add a "counting" class to the element and start counter
      addClass(elem, "counting");
      let timer = setInterval(
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
    let elem = evt.currentTarget;
    let myClass = "active";
    
    return addClass(elem, myClass);
  }

  function inactiveState(evt) {
    let elem = evt.currentTarget;
    let myClass = "active";
    
    return removeClass(elem, myClass);
  }

  function typeIt(evt) {
    let elem = evt.currentTarget;
    let str = elem.innerText;  
    let span = document.createElement("span");  
    let thisStyles = getComputedStyle(elem, null);
    let spanWidth = (Math.round(parseInt(thisStyles.fontSize.replace("px"))/2)) + "px";
    let borderWidth = (Math.round(parseInt(thisStyles.fontSize.replace("px"))/5)) + "px"; 
        
    span.style.display = "inline-block";
    span.style.width = spanWidth;
    span.style.borderBottomStyle = "solid";
    span.style.borderBottomWidth = borderWidth;  
    span.style.marginLeft = "10px";

    let time = (str.length < 30)?100:50;
    let i = 0;
    let typeStr = "";
    elem.innerText = " ";
      
    let typer = setInterval(
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