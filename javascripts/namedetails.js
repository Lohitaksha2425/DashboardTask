const namedetails = document.querySelector("form.body");
const nameinput = document.getElementById("Name");
const emailinput = document.getElementById("Email");
const designinput = document.getElementById("Design");
const phinput = document.getElementById("Ph");

namedetails.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get input values
  const name = nameinput.value.trim();
  const email = emailinput.value.trim();
  const design = designinput.value.trim();
  const ph = phinput.value.trim();

  clearErrors();
  let isValid = true;

  // Validate inputs
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
    // Store data in localStorage
    localStorage.setItem(
      "userData",
      JSON.stringify({ name, email, design, ph })
    );
    alert("Form submitted and data saved!");

    // Redirect to the update page (optional)
    window.location.href = "update.html";
  }
});

// Helper functions
function showError(input, message) {
  clearErrors(input); // Clear previous errors for this input

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
