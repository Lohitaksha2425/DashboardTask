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
    // Create a data object to send to the server
    const userData = { name, email, design, ph };

    // Send data to the server using a POST request
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Form submitted and data saved to the database!");
          displayUserDetails(userData); // Display the submitted details
          namedetails.reset(); // Reset the form
        } else {
          alert("There was an error saving the data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
      });
  }
});
