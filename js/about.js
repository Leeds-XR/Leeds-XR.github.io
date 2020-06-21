/*
about.js
Leeds XR (c) 2020
All Rights Reserved
*/


window.onload = loadCommittee;

function loadCommittee(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateCommittee(this);
    }
  };
  xhttp.open("GET", "/committee/committee.xml", true);
  xhttp.send();
}

function updateCommittee(xml){
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("member");
  
  for(var i = 0; i < x.length; i++){
    var cont = document.createElement('div');
    cont.className = "member";
    if(i < 2) cont.className ="member priority"

    var cont2 = document.createElement('div');

    var name = document.createElement('a');
    name.className = "name";
    name.innerHTML = value(x[i], 'name');

    var role = document.createElement('a');
    role.className = "role";
    role.innerHTML = value(x[i], 'role');

    var email = document.createElement('a');
    email.className = "email";
    email.innerHTML = value(x[i], 'email');
    email.href = "mailto:" + value(x[i], 'email');

    var bio = document.createElement('p');
    bio.className = "bio";
    bio.innerHTML = value(x[i], 'bio');

    var photo = document.createElement('img');
    photo.src =  "/" + value(x[i], 'photo');

    cont2.appendChild(name);
    cont2.appendChild(role);
    cont2.appendChild(email);
    if(i < 2) cont2.appendChild(bio);

    cont.appendChild(photo);
    cont.appendChild(cont2);

    cont.title = value(x[i], 'name');   

    cont.onclick = function(e){
      location.href = "/committee/"
    }

    document.getElementById('committee').appendChild(cont);
  }
}