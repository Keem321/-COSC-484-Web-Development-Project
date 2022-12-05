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
    if(json.length > 0) {
      const jsonObj = JSON.parse(JSON.stringify(json));
      
      const d = new Date();
      const expirationDays = 1;
      d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
      const expires = "expires="+ d.toUTCString();

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

  if (verifyPassword(pass, cpass)) {
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
      window.location.href = res.url;
    }).catch((err) => {
      alert('Error')
      alert(err);
      document.getElementById("fail").innerHTML = "Error";
    });
  }
}

/*function verifyNewAccount() {
  return verifyUsername() && verifyPassword()
}*/

/* Verify Username Length
   - Length L must satisfy 5 < L < 24 */
   function verifyUsername(username) {
    var len = username.length;
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
  if (!loggin) {
    window.location.href = 'login.html';
  } else {
    console.log('check login success');
  }
}