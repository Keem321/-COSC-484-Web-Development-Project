const { response } = require("express");

{
  let categoryList = {};
}

function run() {
  fetch("/api/members")
    .then((res) => res.json())
    .then((json) => {
      const tableSection = document.getElementById("table");
      tableSection.style.visibility = "visible";
      json.forEach(function(user) { 
        tableSection.getElementsByTagName("p")[0].innerText += user.name + '\n';
      });
    });
}

function verifyLogin(e, form) {
  e.preventDefault();
  query = "?email=" + form.floatingInput.value 
  + "&pass=" + form.floatingPassword.value ;

  fetch("/api/login" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    console.log(json);
    console.log(form.memory.checked);
    if(json.length > 0) {
      const jsonObj = JSON.parse(JSON.stringify(json));

      const d = new Date();
      const expirationDays = 10;
      d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      if(!form.memory.checked) {
        expires = "";
      }

      document.cookie = "loggedin=true;" + expires + ";path=/";
      //document.cookie = "email=true;" + expires + ";path=/";
      for (var i = 0; i < jsonObj.length; i++) {
        document.cookie = "email="+ jsonObj[i]['email'] +";" + expires + ";path=/";
        console.log();
      }
      window.location.href = 'index.html';
      } else {
      document.getElementById("fail").innerHTML = "Incorrect Email or Password";
    }
  }).catch((err) => {
    console.log(err);
    document.getElementById("fail").innerHTML = "Error";
  });
}

function verifyNewAccount(e, form) {
  e.preventDefault();
  const pass = form.floatingPassword.value;
  const cpass = form.floatingConfirmPassword.value;
  const uname = form.floatingUsername.value;

  if (verifyPassword(pass, cpass) && verifyUsername(uname)) {
    fetch("/api/signup", {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        "uname": form.floatingUsername.value,
        "email": form.floatingEmail.value,
        "fname": form.floatingFirstName.value,
        "lname": form.floatingLastName.value,
        "pass": form.floatingPassword.value,
        "phone": form.floatingTelephone.value,
        "favs": {}
      })
    }).then((res) => {
      console.log(res);
      // get expires time
      const d = new Date();
      const expirationDays = 1;
      d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
      const expires = "expires="+ d.toUTCString();

      document.cookie = "loggedin=true;" + expires + ";path=/";
      document.cookie = "email="+ form.floatingEmail.value +";" + expires + ";path=/";

      window.location.href = res.url;
    }).catch((err) => {
      alert('Error')
      alert(err);
      document.getElementById("fail").innerHTML = "Error";
    });
  }
}

/* Verify Username Length
   - Length L must satisfy 5 < L < 24 */
   function verifyUsername(username) {
    var len = username.length;
    if( len < 4 ) {
        alert('username must be at least 4 characters long');
        return false;
    }
    else if( len > 24 ) {
        alert('username must be less than 24 characters long');
        return false;
    }
    return true;
}

/* Verify Password Match
   - Password and Confirm Password Inputs must match */
function verifyPassword(password, confirmPassword) {
    if(password != confirmPassword) {
        alert('ensure passwords match');
        return false;
    }
    return true;
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkLogin() {
  let loggin = getCookie("loggedin");
  if(window.location.href.substring(window.location.href.lastIndexOf('/'),) == "/login.html") {
    if (loggin) {
      window.location.href = 'index.html';
    }
  }
  else if (!loggin) {
    window.location.href = 'login.html';
  } else {
    console.log('check login success');
  }
}

function logout() {
  document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = 'login.html';
}

/* Create a post
-  takes a form from home page and creates an entry in the database, returns the new post
*/
function createPost(e, formPost){
  e.preventDefault();
  //query formPost values replaced by id or for element in home page
  query = "?title=" + formPost.title.value
  + "&desc=" + formPost.desc.value
  + "&imageUrl=" + formPost.image.value
  + "&url=" + formPost.url.value
  + "&category=" + formPost.category.value;
  fetch("api/posts" + query, {method: 'post'}).then((res) => res.json()).then((json) => {
    alert(json);
    //test to show data on home
    // var list = document.getElementById("test");
    // var el = document.createElement("p");
    // el.innerText = json.title;
    // list.appendChild(el);
  }).catch((err) => {
    alert(err);
  });
}

/* Shows all posts under a selected category selected by user
*/
function getPost2(e, formPost){
  e.preventDefault();
  query = "?category=" + formPost.categoryG.value;
  fetch("api/post" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    if(json.length == 0){
      alert("No entries found");
    }
    postAdd(json);
  }).catch((err) => {
    alert(err);
  });
}

function getPost(){
  query = "?category=" + "Food";
  fetch("api/post" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    if(json.length == 0){
      alert("No entries found");
    }
    postAdd(json);
    
  }).catch((err) => {

    alert(err);
  });
}

function postAdd(jPost){
  document.getElementById('ca').innerHTML = "";
  for(let i = 0; i < jPost.length; i++){
    var div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.innerHTML = `
    <h4 class="card-title">${jPost[i].title}</h4>
    <h6 class="card-subtitle mb-2 text-muted">${jPost[i].desc}</h6>
     <img src="${jPost[i].imageUrl}" alt= "Image">
     <a href="${jPost[i].link}" class="btn btn-primary">Click Here</a>`;
     document.getElementById('ca').appendChild(div);
  }
}