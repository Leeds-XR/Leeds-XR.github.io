/*
topnav.js
LeedsXR (c) 2020
All Rights Reserved
*/

function check_mobile(){
    return window.innerWidth <= 450;
}

function set_topnav(){
    document.getElementById('bar-img').src = "img/bar-icon.png";
    document.getElementById('h-txt').href = 'javascript: topnav();';
    document.getElementById('links').style.height = 0;
}
function unset_topnav(){
    document.getElementById('bar-img').src = "img/headset.png";
    document.getElementById('h-txt').href = 'index.html';
    document.getElementById('links').style.height = 'initial';
}

function topnav(){
    if(document.getElementById('links').style.height == "0px") document.getElementById('links').style.height = "unset";
    else document.getElementById('links').style.height = 0;
}

if(check_mobile()) set_topnav();

window.onresize = function(){
    if(check_mobile()) set_topnav();
    else unset_topnav();
}

function value(ele, tag){
	if(ele == undefined) return "";
	var tag_ele = ele.getElementsByTagName(tag)[0];
	if(tag_ele && tag_ele.childNodes[0]) return tag_ele.childNodes[0].nodeValue||"";
	else return "";
}