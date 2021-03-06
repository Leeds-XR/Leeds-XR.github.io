/*
topnav.js
Leeds XR (c) 2020
All Rights Reserved
*/

var topNav = document.getElementById('header');
var topNavLinks = document.getElementById('topnav-links');

window.onscroll = function () { 
    "use strict";
    if(location.pathname != "/") return;
    if ((document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80)) {
        topNav.classList.remove("transparent");
        topNavLinks.classList.remove("transparent");
    } 
    else {
        topNav.classList.add("transparent");
        topNavLinks.classList.add("transparent");
    }

    if(document.getElementById('topnav-links').style.height != "0px" && check_topnav()){
        topNav.classList.remove("transparent");
        topNavLinks.classList.remove("transparent");
    }
};

function check_topnav(){
    return window.innerWidth <= 800;
}

function set_topnav(){
    document.getElementById('bar').style.display = "inline-block";
    if(document.getElementById('topnav-links').style.height != "100vh") document.getElementById('topnav-links').style.height = 0;
}
function unset_topnav(){
    document.getElementById('bar').style.display = "none";
    document.getElementById('topnav-links').style.height = 'initial';
}

function topnav(){
	document.getElementById('bar').classList.toggle("change");
    if(document.getElementById('topnav-links').style.height == "0px") {
    	document.getElementById('topnav-links').style.height = "100vh";
        topNav.classList.remove("transparent");
        topNavLinks.classList.remove("transparent");
    }else{
    	document.getElementById('topnav-links').style.height = 0;
    	if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80 ) {
			topNav.classList.remove("transparent");
            topNavLinks.classList.remove("transparent");
		} 
		else {
			topNav.classList.add("transparent");
            topNavLinks.classList.add("transparent");
		}
    }

     if(location.pathname != "/"){
    	topNav.classList.remove("transparent");
        topNavLinks.classList.remove("transparent");
        return;
    }    
}

if(check_topnav()) set_topnav();

window.onresize = function(){
    if(check_topnav()) set_topnav();
    else unset_topnav();
}
