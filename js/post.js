/*
post.js
Leeds XR (c) 2020
All Rights Reserved
*/



window.onload = loadPost;

function loadPost(){
    var xmlhttp = new XMLHttpRequest();
    var url = "/blog/blog.json";

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var blog = JSON.parse(this.responseText);
            showPost(blog);
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function showPost(blog){
    var urlParams = new URLSearchParams(window.location.search);
    var postName = urlParams.get('name');

    var post;
    for(var b of blog) if(b.name === postName) post = b;

    if(post == undefined) location.href = "/blog/";

    var postCont = document.getElementById('post');

    var title = document.createElement('h1');
    title.className = "title";
    title.innerHTML = post.title;

    var date = document.createElement('a');
    date.className = "date";
    date.innerHTML = post.date;

    var img = document.createElement('img');
    img.className = "image";
    img.src = post.img;

    var description = document.createElement('p');
    description.className = "description";
    description.innerHTML = post.description;

    postCont.appendChild(title);
    postCont.appendChild(date);
    postCont.appendChild(img);
    postCont.appendChild(description);
}
