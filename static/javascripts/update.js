document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    document.getElementById("Name").value = userData.name;
    document.getElementById("Email").value = userData.email;

    document.getElementById("Design").value = userData.design;
    document.getElementById("Ph").value = userData.ph;
  } else {
    alert("No data found. Please fill the form first.");
  }

  // Add event listener for updating the data
  const updateButton = document.querySelector(".updatebutton");
  updateButton.addEventListener("click", () => {
    const name = document.getElementById("Name").value.trim();
    const email = document.getElementById("Email").value.trim();
    const design = document.getElementById("Design").value.trim();
    const ph = document.getElementById("Ph").value.trim();

    if (name && email && design && ph) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ name, email, design, ph })
      );
      alert("Data updated successfully!");
    } else {
      alert("All fields are required to update the data.");
    }
  });
});
