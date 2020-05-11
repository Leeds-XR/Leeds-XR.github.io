/*
committee.js
LeedsXR (c) 2020
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
  xhttp.open("GET", "data/committee.xml", true);
  xhttp.send();
}

function updateCommittee(xml){
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("member");
  
  for(var i = 0; i < x.length; i++){
    var cont = document.createElement('div');
    cont.className = "member";

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
    photo.src = value(x[i], 'photo');

    cont2.appendChild(name);
    cont2.appendChild(role);
    cont2.appendChild(email);
    cont2.appendChild(bio);

    cont.appendChild(photo);
    cont.appendChild(cont2);

    document.getElementById('coms').appendChild(cont);
  }
}