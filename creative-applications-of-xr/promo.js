/*
promo.js
Leeds XR (c) 2020
All Rights Reserved
*/

window.onload = loadSpeakers;
function loadSpeakers(){
    var xmlhttp = new XMLHttpRequest();
    var url = "speakers.json";

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var speakers = JSON.parse(this.responseText);
            showSpeakers(speakers);
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function showSpeakers(speakers){
	for(var i = 0; i < speakers.length; i++){
		var container = document.createElement('div');
		
		var name        = document.createElement('h5');
		var description = document.createElement('p');
		
		name.innerHTML = speakers[i].name;
		name.className = "name";
		
		var img = [];
		
		if(Array.isArray(speakers[i].img)){
			for(var j = 0; j < speakers[i].img.length; j++){
				img[j] = document.createElement('img');
				img[j].src = speakers[i].img[j];
				img[j].className = "speaker-img";
			}
		}else{
			img[0] = document.createElement('img');
			img[0].src = speakers[i].img;
			img[0].className = "speaker-img";
		}
		
		description.innerHTML = speakers[i].description;
		description.className = "description";
		
		container.className = "speaker";
		
		container.appendChild(name);
		
		for(var j = 0; j < img.length; j++) container.appendChild(img[j]);
		
		
		container.appendChild(description);
		
		document.getElementById('speakers').appendChild(container);
	}
	
	formatDocument();
}

function formatDocument(){
	var links = document.querySelectorAll('a');
	for(var i = 0; i < links.length; i++) {
		if(links[i].parentElement.className === "description") links[i].target = "_blank";
	}
}
