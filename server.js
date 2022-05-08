const app = require('./app');
const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.DB_URI;
const port = process.env.PORT;


const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.then(() => {
  console.log("Database connection successful");
  app.listen(port, () => {
    console.log("Express server is running")
  })
}
).catch((err) => {
  console.log("Connection failed")
  process.exit(1)
})


// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
