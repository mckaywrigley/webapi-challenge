// Import express
const express = require("express");

// Import Router
const router = express.Router();

// Import Project Data
const Action = require("../data/helpers/actionModel");

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

// Export
module.exports = router;
