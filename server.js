const express = require("express");
const cors = require("cors");
const teamRoutes = require("./routes/teamRoutes"); 
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/team", teamRoutes); // Updated endpoint

// Connect to your horse racing database
mongoose
  .connect("mongodb://localhost:27017/HorseRacingTeam")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("Connection failed:", err));