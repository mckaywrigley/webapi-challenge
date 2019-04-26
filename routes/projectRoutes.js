// Import express
const express = require("express");

// Import Router
const router = express.Router();

// Import Project Data
const Project = require("../data/helpers/projectModel");

// Middleware

// Endpoints

// Read
router.get("/", (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "Projects could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.body;
  Project.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Project info could not be retrieved." });
    });
});

// Create
router.post("/", (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(400).json({
      error: "Please provide a name and description for the project."
    });
  }
  Project.insert({ name, description, completed })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while creating the project." });
    });
});

// Destroy

// Update

// Export

module.exports = router;
