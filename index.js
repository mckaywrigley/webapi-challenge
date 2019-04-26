// Import Express
const express = require("express");

// Use Express
let app = express();

// Routes
const projectRoutes = require("./routes/projectRoutes");
const actionRoutes = require("./routes/actionRoutes");

// Middleware
app.use(express.json());

// Use Routes
app.use("/api/projects", projectRoutes);
app.use("/api/actions", actionRoutes);

// Run server
app.listen(3000, () => {
  console.log("servers running");
});
