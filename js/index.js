/*
index.js
Leeds XR (c) 2020
All Rights Reserved
*/

window.onload = loadBlog;

function loadBlog(){
  var xmlhttp = new XMLHttpRequest();
    var url = "/blog/blog.json";

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var blog = JSON.parse(this.responseText);
            implementBlog(blog);
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function implementBlog(blog){
    for(var i = 0; i < 4 && i < blog.length; i++){
        var cont = document.createElement('div');
        cont.className = 'blog';
        cont.style.backgroundImage = "url(" + blog[i].img + ")";

        var inner = document.createElement('div');
        inner.className = "inner";
        

        var title = document.createElement('a');
        title.className = "title";
        title.innerHTML = blog[i].title;

        var date = document.createElement('a');
        date.className = "date";
        date.innerHTML = blog[i].date;

        var description = document.createElement('p');
        description.className = "description";
        description.innerHTML = blog[i].description;

        inner.appendChild(title);
        inner.appendChild(date);
        inner.appendChild(description);

        cont.setAttribute('onclick', 'location.href = "/blog/post/?name=' + blog[i].name + '"');
		inner.title = blog[i].title;
		cont.classList.add('url');
		
		cont.appendChild(inner);

        document.getElementById('blogs').appendChild(cont);
    }
}