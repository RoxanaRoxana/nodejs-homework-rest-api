const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/jwt");
require("dotenv").config();
require("./config/passport")
const path = require("path");
const fs = require("fs").promises;


const uriDb = process.env.DB_URI;
const port = process.env.PORT;

const uploadDir = path.join(process.cwd(), "tmp");

const isAccesible = (accessiblePath) => {
  return fs
    .access(accessiblePath)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccesible(folder))) {
    await fs.mkdir(folder);
  }
};

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('public'))



app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api", authMiddleware, require("./routes/current"));
app.use("/api/users",  require('./routes/avatars'));


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
       createFolderIfNotExist(uploadDir);
      console.log("Express server is running");
    });
  })
  .catch((err) => {
    console.log("Connection failed");
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
