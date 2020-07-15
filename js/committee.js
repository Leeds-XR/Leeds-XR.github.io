/*
committee.js
Leeds XR (c) 2020
All Rights Reserved
*/

window.onload = loadCommittee;
function loadCommittee(){
  var xmlhttp = new XMLHttpRequest();
    var url = "/committee/committee.json";

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var committee = JSON.parse(this.responseText);
            updateCommittee(committee);
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function updateCommittee(committee){
  
  for(var i = 0; i < committee.length; i++){
    var cont = document.createElement('div');
    cont.className = "member";
    cont.id = committee[i].id;

    var cont2 = document.createElement('div');

    var name = document.createElement('a');
    name.className = "name";
    name.innerHTML = committee[i].name;

    var role = document.createElement('a');
    role.className = "role";
    role.innerHTML = committee[i].role;

    var email = document.createElement('a');
    email.className = "email";
    email.innerHTML = committee[i].email;
    email.href = "mailto:" + committee[i].email;

    var bio = document.createElement('p');
    bio.className = "bio";
    bio.innerHTML = committee[i].bio;

    var photo = document.createElement('img');
    photo.src = committee[i].photo;

    cont2.appendChild(name);
    cont2.appendChild(role);
    cont2.appendChild(email);
    cont2.appendChild(bio);

    cont.appendChild(photo);
    cont.appendChild(cont2);

    document.getElementById('committee').appendChild(cont);
  }
  
  if(window.location.hash == "") return;
  var top = document.getElementById(window.location.hash.substring(1)).offsetTop;
  window.scrollTo(0, top - 170);  
}