// Import Express
const express = require("express");

// Routes
const projectRoutes = require("./routes/projectRoutes");
const actionRoutes = require("./routes/actionRoutes");

// Middleware
server.use(express.json());

// Use Routes
server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

// Run Server
server.listen(3000, () => {
  console.log("server running");
});
