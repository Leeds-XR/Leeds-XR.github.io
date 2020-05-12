/*
index.js
LeedsXR (c) 2020
All Rights Reserved
*/

window.onload = function(){
    loadBlog();
    loadCommittee();
    loadShowcases();
}

function loadBlog(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateEvents(this);
    }
  };
  xhttp.open("GET", "data/blog.xml", true);
  xhttp.send();
}

function updateEvents(xml){
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("post");
  
  if(x[0]){
      document.getElementById('post-1').title = value(x[0], 'title');
      document.getElementById('p-1-title').innerHTML = value(x[0], 'title');
      document.getElementById('p-1-date').innerHTML = value(x[0], 'date');
      document.getElementById('p-1-author').innerHTML = value(x[0], 'author');
      document.getElementById('p-1-p').innerHTML = value(x[0], 'description');
  }
    
  if(x[1]){
      document.getElementById('post-2').title = value(x[1], 'title');
      document.getElementById('p-2-title').innerHTML = value(x[1], 'title');
      document.getElementById('p-2-date').innerHTML = value(x[1], 'date');
      document.getElementById('p-2-author').innerHTML = value(x[1], 'author');
      document.getElementById('p-2-p').innerHTML = value(x[1], 'description');
  }
}

function loadCommittee(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateCommittee(this);
    }
  };
  xhttp.open("GET", "data/committee.xml", true);
  xhttp.send();
}

var max_member = 20;
function updateCommittee(xml){
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("member");
    for(var i = 0; i < x.length && i < max_member; i++){
    	var cont = document.createElement('div');

    	var name = document.createElement('a');
    	name.innerHTML = value(x[i], 'name');
    	name.className = "c-name";
        
        var role = document.createElement('a');
        role.innerHTML = value(x[i], 'role');
        role.className = "c-role";

        var email = document.createElement('a');
        email.innerHTML = value(x[i], 'email');
        email.className = "c-email";
        email.href = "mailto:" + value(x[i], 'email');

        var photo = document.createElement('img');
        photo.src = value(x[i], 'photo');
        photo.className = "c-photo";

        var cont2 = document.createElement('div');

        cont2.appendChild(name);
        cont2.appendChild(role);
        cont2.appendChild(email);
        cont.appendChild(cont2);
        cont.appendChild(photo);

        cont.className = "c-member";
        document.getElementById('members').appendChild(cont);
    }
}

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

	for(var i = 0; i < x.length && i < max_showcases; i++){
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

        cont2.appendChild(cont);
		cont2.appendChild(logo);
		

		cont2.className = "showcase"

		document.getElementById('showcases').appendChild(cont2);
	}
}