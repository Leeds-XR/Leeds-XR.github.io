/*
showcase.js
LeedsXR (c) 2020
All Rights Reserved
*/

window.onload = loadShowcases;

function loadShowcases(){
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      updateShowcases(this);
    }
  };
  xhttp.open("GET", "data/showcases.xml", true);
  xhttp.send(); 
}


var max_showcases = 4;
function updateShowcases(xml){
    var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("showcase");

	for(var i = 0; i < x.length; i++){
		var cont = document.createElement('div');

		var title = document.createElement('a');
		title.innerHTML = value(x[i], 'title');
		title.className = "s-title";

		var author = document.createElement('a');
		author.innerHTML = value(x[i], 'author');
		author.className = "s-author";

		var description = document.createElement('p');
		description.innerHTML = value(x[i], 'description');
		description.className = "s-desc";
        
        var url = value(x[i], 'url');
		cont.addEventListener('click', function(){
			window.open(url)
		}, false);

		cont.appendChild(title);
		cont.appendChild(author);
		cont.appendChild(description);

		cont.className = "showcase_txt";
		cont.title = value(x[i], 'title') + " by " + value(x[i], 'author');

		var cont2 = document.createElement('div');

		var logo = document.createElement('img');
		logo.src = value(x[i], 'img');
        
        cont2.appendChild(logo);
        cont2.appendChild(cont);		

		cont2.className = "showcase"

		document.getElementById('scs').appendChild(cont2);
	}
}
