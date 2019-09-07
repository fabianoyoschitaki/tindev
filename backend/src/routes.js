// separate routes in a different file
const express = require("express");
// importing controllers
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

// object to configure our routes.
const routes = express.Router();

//GET, POST, PUT, DELETE
routes.get("/", (req, res) => {
  //return res.send(`Hello ${req.query.name}`); // template string
  return res.json({ mensagem: `Olá ${req.query.name}` }); // template string
});

/** deprecated 1. 
// create  devs
routes.post("/devs", (req, res) => {
  // this returns undefined. this is because express it does not come with json understanding.
  // we need to tell it our req body will be json: server.use(express.json());
  console.log(req.body);
  res.json(req.body);
});*/

// create devs
routes.post("/devs", DevController.store);
// list devs
routes.get("/devs", DevController.index);
// like devs
routes.post("/devs/:devId/likes", LikeController.store);
// dislike devs
routes.post("/devs/:devId/dislikes", DislikeController.store);

// export so server.js can use it
module.exports = routes;
