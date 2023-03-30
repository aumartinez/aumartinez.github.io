window.addEventListener("load", run, false);

function run() {
 let elems = document.querySelectorAll("*"); 
 let imgs = document.querySelectorAll("img");
  
 for (let i = 0; i < imgs.length ; i++) {   
   let regEx = /\^media_src_(.*?)\^/;
   let str = imgs[i].getAttribute("src");

   let imgSrc = regEx.exec(str);
   
   if (!imgSrc) {
     continue;
   }
   
   str = "img/" + imgSrc[1];   
   imgs[i].setAttribute("src", str);
 }
 
 for (let i = 0; i < elems.length; i++) {
   let styles = getComputedStyle(elems[i], null);
   let befores = getComputedStyle(elems[i], "::before");
   let afters = getComputedStyle(elems[i], "::after");
   
   if (styles.backgroundImage !== "none") {
     let imgSrc = styles.backgroundImage;     
     elems[i].style.backgroundImage = regExExecute(imgSrc);
   }
   
   if (befores.backgroundImage !== "none") {
     let imgSrc = befores.backgroundImage;
     let str = regExExecute(imgSrc);
     
     let rule = "*[data-before=\"style-"+ i +"\"]::before {\n\
                   background-image:"+ str + "!important;\n\
                   \}";
                   
     createCSS(rule);
     elems[i].setAttribute("data-before", "style-" + i);
   }
   
   if (afters.backgroundImage !== "none") {
     let imgSrc = afters.backgroundImage;
     let str = regExExecute(imgSrc);
     
     let rule = "*[data-after=\"style-"+ i +"\"]::after {\n\
                   background-image:"+ str + "!important;\n\
                   \}";
     
     createCSS(rule);
     elems[i].setAttribute("data-after", "style-" + i);
   }
 }  
}

function regExExecute(imgSrc) {
  let regEx = /url\((.*?)\)/;
  let remEx = /\"|\'|media_src_|\%5E/g;
     
  let str = regEx.exec(imgSrc);     
  let arr = str[1].split("/");
     
  str = arr[(arr.length - 1)].replace(remEx,"");     
  
  return "url('img/" + str + "')";;
}

function createCSS(rule) {
  let css = document.createElement("style");
  css.type = "text/css";
  css.appendChild(document.createTextNode(rule));
  document.getElementsByTagName("head")[0].appendChild(css);
}