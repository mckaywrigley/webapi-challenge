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
  Action.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "Actions could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Action.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: "Action info could not be retrieved." });
    });
});

// Create
router.post("/", (req, res) => {
  const { notes, description, completed, project_id } = req.body;
  if (!notes || !description || !project_id) {
    res.status(400).json({
      error:
        "Please provide project_id, notes, and a description for the project."
    });
  }
  Action.insert({ notes, description, completed, project_id })
    .then(action => {
      res.status(201).json(action);
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
  Action.remove(id)
    .then(action => {
      if (action === 0) {
        res.status(404).json({
          message: "The action with the provided ID does not exists."
        });
      }
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be removed." });
    });
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { notes, description, completed, project_id } = req.body;
  if (!notes || !description || !project_id) {
    res.status(400).json({
      error: "Please provide project id, notes, and description for the action."
    });
  }
  Action.update(id, { notes, description, completed, project_id })
    .then(action => {
      if (action === 0) {
        res.status(404).json({
          message: "The action with the provided ID does not exists."
        });
      }
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be updated." });
    });
});

// Export
module.exports = router;
