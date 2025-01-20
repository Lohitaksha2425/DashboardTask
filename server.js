const express = require("express");
const app = express();

app.use(express.json());

app.get("/welcome", (req, res) => {
  res.send("Welcome to your first backend route!");
});

app.post("/submit", (req, res) => {
  const { name, age } = req.body; // Extract name and age from the request body
  res.send(`Hello, ${name}! You are ${age} years old.`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
