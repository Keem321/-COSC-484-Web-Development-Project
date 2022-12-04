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
  query = "?title" + formPost.value
  + "&desc" + formPost.value
  + "&imageUrl" + formPost.value
  + "&category" + formPost.value;
  fetch("api/posts" + query, {method: 'post'}).then((res) => res.json()).then((json) => {
    alert(json);
  }).catch((err) => {
    alert(err);
  });
}

/* Shows all posts under a selected category selected by user
*/
function showPost(e, getPosts){
  e.preventDefault();
  // getPost.value to be replaced by id or element in home.html
  query = "?category" + getPosts.value;
  fetch("api/post" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    alert(json);
  }).catch((err) => {
    alert(err);
  });
}