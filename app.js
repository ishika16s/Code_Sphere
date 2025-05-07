const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const repoRoutes = require("./routes/repoRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/auth", authRoutes);
app.use("/api/repos", repoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
