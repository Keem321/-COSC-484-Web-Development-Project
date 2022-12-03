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
const form = document.getElementById("login-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault()

  const formData = new FormData();
  formData.append(
    'email',
    document.querySelector('input[id="floatingInput"]').value
  )
  formData.append(
    'password',
    document.querySelector('input[id="floatingPassword"]').value
  )

  fetch("api/accounts",
  {
    method: "POST",
    body: formData,
  })
  .then(response => console.log(response))
  .catch(error => console.log(error))
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