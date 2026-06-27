const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Home
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Multer (menyimpan file di memory)
const upload = multer({
  storage: multer.memoryStorage()
});

// Upload endpoint
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded"
    });
  }

  const { originalname, mimetype, size } = req.file;

  return res.status(200).json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});