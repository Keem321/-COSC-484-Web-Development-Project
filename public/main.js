const { json } = require("express");

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

/* Verify all requirements met */
function verifyLogin(e, form) {
  e.preventDefault();
  query = "?email=" + form.floatingInput.value 
  + "&pass=" + form.floatingPassword.value ;
  alert(form.floatingInput.value);
  alert(query);
  fetch("api/accounts" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    alert('form submit!');
    alert(json);
  }).catch((err) => {
    alert('Error')
    alert(err);
  });
}

function verifyNewAccount() {
  return verifyUsername() && verifyPassword()
}

/* Verify Username Length
   - Length L must satisfy 5 < L < 24 */
   function verifyUsername() {
    var len = document.getElementById('floatingUsername').value.length;
    if( len < 6 ) {
        alert('username must be at least 6 characters long');
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
function verifyPassword() {
    if(document.getElementById('floatingPassword').value != document.getElementById('floatingConfirmPassword').value) {
        alert('ensure passwords match');
        return false;
    }
    return true;
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
  + "&category=" + formPost.category.value;
  fetch("api/posts" + query, {method: 'post'}).then((res) => res.json()).then((json) => {
    alert(json);
    var list = document.getElementById("test");
    var el = document.createElement("p");
    el.innerText = json.title;
    list.appendChild(el);
  }).catch((err) => {
    alert(err);
  });
}

/* Shows all posts under a selected category selected by user
*/
function getPost(e, getPosts){
  e.preventDefault();
  // getPost.value to be replaced by id or element in home.html
  query = "?category=" + getPosts.categoryG.value;
  alert(query);
  fetch("api/post" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    alert("Form");
    alert(JSON.stringify(json[0]));
    alert(json.length);
    var count = 0;
    document.getElementById("test").innerHTML = "";
    var list = document.getElementById("test");
    while (count < json.length){
      var el = document.createElement("p");
      el.innerText = json[count].title;
      list.appendChild(el);
      count++;
    }
  }).catch((err) => {
    alert(err);
  });
}