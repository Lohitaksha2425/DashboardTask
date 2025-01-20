const namedetails = document.querySelector("form.body");
const nameinput = document.getElementById("Name");
const emailinput = document.getElementById("Email");
const designinput = document.getElementById("Design");
const phinput = document.getElementById("Ph");

const displaySection = document.getElementById("displaySection");

document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    //displayUserDetails(userData);
    document.getElementById("Name").value = userData.name;
    document.getElementById("Email").value = userData.email;
    document.getElementById("Design").value = userData.design;
    document.getElementById("Ph").value = userData.ph;
  }
});

namedetails.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameinput.value.trim();
  const email = emailinput.value.trim();
  const design = designinput.value.trim();
  const ph = phinput.value.trim();

  clearErrors();
  let isValid = true;

  if (name === "") {
    showError(nameinput, "Name is Required");
    isValid = false;
  }
  if (email === "") {
    showError(emailinput, "Email is Required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailinput, "Invalid Email Format");
    isValid = false;
  }
  if (design === "") {
    showError(designinput, "Design is Required");
    isValid = false;
  }
  if (ph === "" || isNaN(ph)) {
    showError(phinput, "Phone is Required and must be a number");
    isValid = false;
  }

  if (isValid) {
    const userData = { name, email, design, ph };
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Form submitted and data saved!");

    displayUserDetails(userData);
    namedetails.reset();
  }
});

function showError(input, message) {
  clearErrors(input);

  const errorSpan = document.createElement("span");
  errorSpan.classList.add("error");
  errorSpan.style.color = "red";
  errorSpan.style.fontSize = "14px";
  errorSpan.style.display = "block";
  errorSpan.style.marginBottom = "10px";
  errorSpan.textContent = message;

  input.style.border = "2px solid red";
  input.parentElement.insertBefore(errorSpan, input);
  input.parentElement.style.marginBottom = "15px";
}

function clearErrors(input = null) {
  const errors = input
    ? input.parentElement.querySelectorAll(".error")
    : document.querySelectorAll(".error");

  errors.forEach((error) => error.remove());

  if (input) {
    input.style.border = "";
    input.parentElement.style.marginBottom = "";
  } else {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((inp) => {
      inp.style.border = "";
      inp.parentElement.style.marginBottom = "";
    });
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayUserDetails(userData) {
  displaySection.innerHTML = "";

  const userDetailsContainer = document.createElement("div");
  userDetailsContainer.style.padding = "10px";
  userDetailsContainer.style.backgroundColor = "#f0f0f0";
  userDetailsContainer.style.border = "1px solid #ccc";
  userDetailsContainer.style.borderRadius = "5px";
  userDetailsContainer.style.marginTop = "20px";

  userDetailsContainer.innerHTML = `
    <p><strong>Name:</strong> ${userData.name}</p>
    <p><strong>Email:</strong> ${userData.email}</p>
    <p><strong>Designation:</strong> ${userData.design}</p>
    <p><strong>Phone:</strong> ${userData.ph}</p>
  `;

  displaySection.appendChild(userDetailsContainer);
}
