/*
topnav.js
Leeds XR (c) 2020
All Rights Reserved
*/

var topNav = document.getElementById('header');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80) {
        topNav.classList.add("colored");
        topNav.classList.remove("transparent");
    } 
    else {
        topNav.classList.add("transparent");
        topNav.classList.remove("colored");
    }

    if(document.getElementById('topnav-links').style.height != "0px" && check_topnav()){
        topNav.classList.add("colored");
        topNav.classList.remove("transparent");
    }
};

function check_topnav(){
    return window.innerWidth <= 800;
}

function set_topnav(){
    document.getElementById('bar').style.display = "inline-block";
    document.getElementById('topnav-links').style.height = 0;
}
function unset_topnav(){
    document.getElementById('bar').style.display = "none";
    document.getElementById('topnav-links').style.height = 'initial';
}

function topnav(){
	document.getElementById('bar').classList.toggle("change");
    if(document.getElementById('topnav-links').style.height == "0px") {
    	document.getElementById('topnav-links').style.height = "100vh";
    	topNav.classList.add("colored");
        topNav.classList.remove("transparent");
    }else{
    	document.getElementById('topnav-links').style.height = 0;
    	if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80 ) {
			topNav.classList.add("colored");
			topNav.classList.remove("transparent");
		} 
		else {
			topNav.classList.add("transparent");
			topNav.classList.remove("colored");
		}
    }
}

if(check_topnav()) set_topnav();

window.onresize = function(){
    if(check_topnav()) set_topnav();
    else unset_topnav();
}
