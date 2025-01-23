const reset = document.querySelector("form.container");
const oldinput = document.getElementById("oldpassword");
const newinput = document.getElementById("newpassword");

reset.addEventListener("submit", function (event) {
  event.preventDefault();
  const oldpass = oldinput.value.trim();
  const newpass = newinput.value.trim();
  clearErrors();
  let isValid = true;

  // Check if the old password field is empty
  if (oldpass === "") {
    showError(oldinput, "Old Password Required", "errorold");
    isValid = false;
  }

  // Check if the new password field is empty
  if (newpass === "") {
    showError(newinput, "New Password Required", "errornew");
    isValid = false;
  }

  // Check if the new password matches the old password
  if (oldpass !== "" && newpass !== "" && oldpass !== newpass) {
    showError(
      newinput,
      "New Password must match the Old Password",
      "errormatch"
    );
    isValid = false;
  }

  // Submit the form via AJAX if all validations pass
  if (isValid) {
    submitForm(oldpass, newpass); // Call the function to send the data to the server
  }
});

function showError(input, message, errorType = "errorold") {
  clearErrors(input);
  const errorspan = document.createElement("span");
  errorspan.classList.add(errorType); // Use dynamic class for error type
  errorspan.textContent = message;

  const parent = input.closest(".textinput");
  if (parent) {
    parent.classList.add("error-active");
    parent.style.border = "2px solid red"; // Highlight the input field
    input.insertAdjacentElement("afterend", errorspan);
  }
}

function clearErrors(input = null) {
  if (input) {
    // Clear errors only for the specific input
    const errors = input.parentElement.querySelectorAll(
      ".errorold, .errornew, .errormatch"
    );
    errors.forEach((error) => error.remove());

    // Reset border for the parent
    const parent = input.closest(".textinput");
    if (parent) {
      parent.style.border = ""; // Reset the border to default
      parent.classList.remove("error-active");
    }
  } else {
    // Clear all errors and reset all borders
    const errors = document.querySelectorAll(
      ".errorold, .errornew, .errormatch"
    );
    errors.forEach((error) => error.remove());

    const parents = document.querySelectorAll(".textinput");
    parents.forEach((parent) => {
      parent.style.border = ""; // Reset the border to default
      parent.classList.remove("error-active");
    });
  }
}

function submitForm(oldpass, newpass) {
  // Use fetch to send data to the server (Flask)
  fetch("/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `oldpassword=${encodeURIComponent(
      oldpass
    )}&newpassword=${encodeURIComponent(newpass)}`,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data); // Show server response (confirmation message)
      reset.reset(); // Reset the form fields
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while saving your password.");
    });
}
