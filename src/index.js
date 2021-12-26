const express = require("express");
const mongoose = require("mongoose");

const app = express();

const route = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// creating the db connection
mongoose
  .connect(
    "mongodb+srv://user-open-to-all-trainees:AutogenerateSecurePassword@training-cluster.xohin.mongodb.net/Mayank_AttriDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);

let server = app.listen(3000, () => {
  console.log("server running on 3000");
});

// if any unhandled promise breaks the code we will stop the server
process.on("unhandledRejection", (err) => {
  console.log(`error: ${err.message} `);
  console.log("shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
