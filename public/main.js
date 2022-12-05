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

/* Verify all requirements met !! add password check??*/
function verifyLogin(e, form) {
  e.preventDefault();
  query = "?email=" + form.floatingInput.value 
  + "&pass=" + form.floatingPassword.value ;

  fetch("/api/login" + query, {method: 'get'}).then((res) => res.json()).then((json) => {
    if(json) {
      window.location.href = 'index.html';
      //document.cookie = "email=John Doe";
     // document.cookie = "loggedIn=true; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
  info = {
    "uname": form.floatingUsername.value,
    "email": form.floatingEmail.value,
    "fname": form.floatingFirstName.value,
    "lname": form.floatingLastName.value,
    "pass": form.floatingPassword.value,
    "phone": form.floatingTelephone.value,
    "favs": {}
  }
  fetch("api/signup", {method: 'post'}).then((res) => {
    alert(response);
  }).catch((err) => {
    alert('Error')
    alert(err);
    document.getElementById("fail").innerHTML = "Error";
  });
}

/*function verifyNewAccount() {
  return verifyUsername() && verifyPassword()
}*/

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