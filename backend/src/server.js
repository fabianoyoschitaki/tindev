const express = require("express");
// ODM
const mongoose = require("mongoose");
// CORS
const cors = require("cors");

const routes = require("./routes");

const server = express();

// get the string url and change the DB to omnistack8. It will create automatically if it not exist.
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-bth2y.mongodb.net/omnistack8?retryWrites=true&w=majority",
  {
    useNewUrlParser: true //to avoid deprecation and warning
  }
);

// add cors anywhere BUT NOT after the routes. Not it's ready to accept React and React Native
server.use(cors());
// we need to tell it our req body will be json: server.use(express.json()); before using routes.
server.use(express.json());
server.use(routes);

server.listen(3333);
