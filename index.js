function savePerson(person) {
  var people = getPeople();
  people.push(person);
  localStorage.setItem("people", JSON.stringify(people));
}
function getPeople() {
  var peopleString = localStorage.getItem("people");
  return peopleString ? JSON.parse(peopleString) : [];
}
function updatePerson(person) {
  var people = getPeople();
  var index = people.findIndex(function (p) {
    return p.id === person.id;
  });
  if (index !== -1) {
    people[index] = person;
    localStorage.setItem("people", JSON.stringify(people));
  }
}
function deletePerson(id) {
  var people = getPeople();
  var updatedPeople = people.filter(function (p) {
    return p.id !== id;
  });
  localStorage.setItem("people", JSON.stringify(updatedPeople));
}
function displayPeople() {
  var people = getPeople();
  var tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  for (var _i = 0, people_1 = people; _i < people_1.length; _i++) {
    var person = people_1[_i];
    var row = document.createElement("tr");
    row.innerHTML = "\n      <td>"
      .concat(person.id, "</td>\n      <td>")
      .concat(person.name, "</td>\n      <td>")
      .concat(
        person.age,
        '</td>\n      <td>\n        <button class="btn btn-primary btn-sm btn-edit" data-id="'
      )
      .concat(
        person.id,
        '">Edit\uD83D\uDD8C</button>\n        <button class="btn btn-danger btn-sm btn-delete" data-id="'
      )
      .concat(person.id, '">Delete\uD83D\uDDD1</button>\n      </td>\n    ');
    tableBody.appendChild(row);
  }
}
function resetForm() {
  var form = document.getElementById("person-form");
  form.reset();
}
function initializeForm() {
  var form = document.getElementById("person-form");
  var cancelButton = document.getElementById("cancel-button");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("name-input");
    var ageInput = document.getElementById("age-input");
    var name = nameInput.value;
    var age = parseInt(ageInput.value, 10);
    if (editingPersonId !== null) {
      var updatedPerson = {
        id: editingPersonId,
        name: name,
        age: age,
      };
      updatePerson(updatedPerson);
    } else {
      var newPerson = {
        id: Date.now(),
        name: name,
        age: age,
      };
      savePerson(newPerson);
    }
    resetForm();
    displayPeople();
    editingPersonId = null;
  });
  cancelButton.addEventListener("click", function () {
    resetForm();
    editingPersonId = null;
  });
}
var editingPersonId = null;
document.addEventListener("DOMContentLoaded", function () {
  displayPeople();
  initializeForm();
  var tableBody = document.getElementById("table-body");
  tableBody.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("btn-edit")) {
      var id_1 = parseInt(target.getAttribute("data-id"), 10);
      var people = getPeople();
      var person = people.find(function (p) {
        return p.id === id_1;
      });
      if (person) {
        var nameInput = document.getElementById("name-input");
        var ageInput = document.getElementById("age-input");
        nameInput.value = person.name;
        ageInput.value = person.age.toString();
        editingPersonId = person.id;
      }
    } else if (target.classList.contains("btn-delete")) {
      var id = parseInt(target.getAttribute("data-id"), 10);
      deletePerson(id);
      displayPeople();
    }
  });
});
function setupDarkModeToggle() {
  var darkModeToggle = document.getElementById("dark-mode-toggle");
  var body = document.body;
  darkModeToggle.addEventListener("click", function () {
    var isDarkMode = localStorage.getItem("darkMode") === "true";
    var newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  });
  function setDarkMode(isDarkMode) {
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }
}
document.addEventListener("DOMContentLoaded", setupDarkModeToggle);
