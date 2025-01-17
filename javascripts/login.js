const loginForm = document.querySelector("form.body");
const usernameInput = document.getElementById("Username");
const passwordInput = document.getElementById("Password");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  clearErrors();
  let isValid = true;
  if (username === "") {
    showError(usernameInput, "Username is required.");
    isValid = false;
  } else if (username.length < 3) {
    showError(usernameInput, "Username must be at least 3 characters long.");
    isValid = false;
  }
  if (password === "") {
    showError(passwordInput, "Password is required.");
    isValid = false;
  } else if (password.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters long.");
    isValid = false;
  }
  if (isValid) {
    alert("Login successful!");
    console.log("Username:", username);
    console.log("Password:", password);
  }
});
function showError(input, message) {
  const errorSpan = document.createElement("span");
  errorSpan.classList.add("error");
  errorSpan.style.color = "red";
  errorSpan.style.fontSize = "14px";
  errorSpan.textContent = message;
  input.parentElement.appendChild(errorSpan);
}
function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => error.remove());
}
