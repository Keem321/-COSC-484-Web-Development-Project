function run() {
  fetch("/api/members")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      console.log(json[0]);
      console.log(json[0].age);
      const tableSection = document.getElementById("table");
      
      json.forEach(function(user) { tableSection.getElementsByTagName("p")[0].innerText += user.name; });

      tableSection.style.visibility = "visible";
    });
}