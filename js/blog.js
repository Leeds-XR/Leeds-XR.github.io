/*
blog.js
LeedsXR (c) 2020
All Rights Reserved
*/

window.onload = loadBlog;

function loadBlog(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateBlog(this);
    }
  };
  xhttp.open("GET", "data/blog.xml", true);
  xhttp.send();
}

function updateBlog(xml){
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("post");
  
  for(var i = 0; i < x.length; i++){
    var cont = document.createElement('div');

    var title = document.createElement('h2');
    title.innerHTML = value(x[i], 'title');
    title.className = "title";

    var author = document.createElement('a');
    author.innerHTML = value(x[i], 'author');
    author.className = "author";

    var date = document.createElement('a');
    date.innerHTML = value(x[i], 'date');
    date.className = "date";

    var desc = document.createElement('p');
    desc.innerHTML = value(x[i],'description');
    desc.className = 'desc';

    cont.className = "post";

    cont.appendChild(title);
    cont.appendChild(date);
    cont.appendChild(author);
    cont.appendChild(desc);

    document.getElementById('posts').appendChild(cont);
  }
}