/*
events.js
LeedsXR (c) 2020
All Rights Reserved
*/

window.onload = loadEvents;

function loadEvents(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateEvents(this);
    }
  };
  xhttp.open("GET", "data/events.xml", true);
  xhttp.send();
}

function updateEvents(xml){
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("event");
  
  for(var i = 0; i < x.length; i++){
    var cont = document.createElement('div');

    var title = document.createElement('h2');
    title.innerHTML = value(x[i], 'title');
    title.className = "title";

    var organisation = document.createElement('a');
    organisation.innerHTML = value(x[i], 'organisation');
    organisation.className = "org";

    var date = document.createElement('a');
    date.innerHTML = value(x[i], 'date');
    date.className = "date";

    var desc = document.createElement('p');
    desc.innerHTML = value(x[i],'description');
    desc.className = 'desc';

    cont.className = "event";

    cont.appendChild(title);
    cont.appendChild(date);
    cont.appendChild(organisation);
    cont.appendChild(desc);

    document.getElementById('evts').appendChild(cont);
  }
}