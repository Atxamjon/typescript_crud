interface Person {
  id: number;
  name: string;
  age: number;
}

function savePerson(person: Person): void {
  const people = getPeople();
  people.push(person);
  localStorage.setItem("people", JSON.stringify(people));
}

function getPeople(): Person[] {
  const peopleString = localStorage.getItem("people");
  return peopleString ? JSON.parse(peopleString) : [];
}

function updatePerson(person: Person): void {
  const people = getPeople();
  const index = people.findIndex((p) => p.id === person.id);
  if (index !== -1) {
    people[index] = person;
    localStorage.setItem("people", JSON.stringify(people));
  }
}

function deletePerson(id: number): void {
  const people = getPeople();
  const updatedPeople = people.filter((p) => p.id !== id);
  localStorage.setItem("people", JSON.stringify(updatedPeople));
}

function displayPeople(): void {
  const people = getPeople();
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  for (const person of people) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${person.id}</td>
      <td>${person.name}</td>
      <td>${person.age}</td>
      <td>
        <button class="btn btn-primary btn-sm btn-edit" data-id="${person.id}">Edit🖌</button>
        <button class="btn btn-danger btn-sm btn-delete" data-id="${person.id}">Delete🗑</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

function resetForm(): void {
  const form = document.getElementById("person-form") as HTMLFormElement;
  form.reset();
}

function initializeForm(): void {
  const form = document.getElementById("person-form") as HTMLFormElement;
  const cancelButton = document.getElementById(
    "cancel-button"
  ) as HTMLButtonElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name-input") as HTMLInputElement;
    const ageInput = document.getElementById("age-input") as HTMLInputElement;

    const name = nameInput.value;
    const age = parseInt(ageInput.value, 10);

    if (editingPersonId !== null) {
      const updatedPerson: Person = {
        id: editingPersonId,
        name,
        age,
      };
      updatePerson(updatedPerson);
    } else {
      const newPerson: Person = {
        id: Date.now(),
        name,
        age,
      };
      savePerson(newPerson);
    }

    resetForm();
    displayPeople();
    editingPersonId = null;
  });

  cancelButton.addEventListener("click", () => {
    resetForm();
    editingPersonId = null;
  });
}

let editingPersonId: number | null = null;

document.addEventListener("DOMContentLoaded", () => {
  displayPeople();
  initializeForm();

  const tableBody = document.getElementById("table-body") as HTMLElement;
  tableBody.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("btn-edit")) {
      const id = parseInt(target.getAttribute("data-id") as string, 10);
      const people = getPeople();
      const person = people.find((p) => p.id === id);

      if (person) {
        const nameInput = document.getElementById(
          "name-input"
        ) as HTMLInputElement;
        const ageInput = document.getElementById(
          "age-input"
        ) as HTMLInputElement;

        nameInput.value = person.name;
        ageInput.value = person.age.toString();

        editingPersonId = person.id;
      }
    } else if (target.classList.contains("btn-delete")) {
      const id = parseInt(target.getAttribute("data-id") as string, 10);
      deletePerson(id);
      displayPeople();
    }
  });
});
function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  });

  function setDarkMode(isDarkMode: boolean) {
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }
}

document.addEventListener("DOMContentLoaded", setupDarkModeToggle);
