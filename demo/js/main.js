let items = document.querySelectorAll(".menu>.menu-item");

function run() {
	findChildren();
	getChildren();
}

function findChildren() {
	let str = "submenu"
	let childrenFound;

	for (let i = 0; i < items.length; i++) {
		childrenFound = items[i].innerHTML.search(str);
		if (childrenFound > 1) {
			addClass("has-children", items[i]);
		}
	}
}

function addClass(name, elem) {
	let arr = elem.className.split(" ");
	if (arr.indexOf(name) == -1) {
		elem.className += " " + name;
	}
}

function getChildren() {
	let elems = document.querySelectorAll(".has-children");
	addEventsListenerToList(elems, "click", clickhandler);
}

function addEventsListenerToList(list, evt, func) {
	for (let i = 0; i < list.length; i++) {
		list[i].addEventListener(evt, func, false);
	}
}

function clickhandler(evt) {
	let elem = evt.target.nextElementSibling;

	if (elem !== null) {
		if (elem.style.visibility == "") {
			elem.style.visibility = "visible";
		} else {
			elem.style.visibility = "";
		}
	} else {
		return;
	}
}

window.onload = run;
