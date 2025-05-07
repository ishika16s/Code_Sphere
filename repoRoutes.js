const express = require("express");
const jwt = require("jsonwebtoken");
const Repository = require("../models/Repository");

const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

router.post("/create", authMiddleware, async (req, res) => {
  const { name, description } = req.body;
  const repo = await Repository.create({ name, description, owner: req.userId });
  res.json(repo);
});

router.get("/my", authMiddleware, async (req, res) => {
  const repos = await Repository.find({ owner: req.userId });
  res.json(repos);
});

router.post("/:id/files", authMiddleware, async (req, res) => {
  const { filename, content, language } = req.body;
  const repo = await Repository.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { $push: { files: { filename, content, language } } },
    { new: true }
  );
  res.json(repo);
});

module.exports = router;
