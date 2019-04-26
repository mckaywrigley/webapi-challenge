// Import express
const express = require("express");

// Import Router
const router = express.Router();

// Import Project Data
const Project = require("../data/helpers/projectModel");

// Middleware

// --- Endpoints ---

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

router.get("/:id/actions", (req, res) => {
  const { id } = req.body;
  Project.getProjectActions(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Actions for project could not be retrieved." });
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
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Project.remove(id)
    .then(project => {
      if (project === 0) {
        res.status(404).json({
          message: "The project with the provided ID does not exists."
        });
      }
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: "The project could not be removed." });
    });
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(400).json({
      error: "Please provide a name and description for the project."
    });
  }
  Project.update(id, { name, description, completed })
    .then(project => {
      if (project === 0) {
        res.status(404).json({
          message: "The project with the provided ID does not exists."
        });
      }
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "The project could not be updated." });
    });
});

// Export
module.exports = router;
