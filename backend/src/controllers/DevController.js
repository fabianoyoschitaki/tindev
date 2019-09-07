// good practice is having per controller: INDEX, SHOW, STORE, UPDATE, DELETE

// to access API let's use axios
const axios = require("axios");
const Dev = require("../models/Dev");

// routes.js import this
module.exports = {
  async index(req, res) {
    // fetch logged user
    const { user } = req.headers;
    const loggedUser = await Dev.findById(user);

    // 3 filters: my id is different AND user did not like AND user did not dislike
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } }
      ]
    });
    return res.json(users);
  },
  async store(req, res) {
    //console.log(req.body.username);
    // get username from github https://api.github.com/users/fabianoyoschitaki
    const { username } = req.body;

    // before going to github, check if the user already exists:
    const userExists = await Dev.findOne({ user: username });
    if (userExists) {
      console.log(`User ${username} already exists.`);
      return res.json(userExists);
    }
    // axios.get is asynchronous. so response.data will not exist. let's tell node to wait the execution of the line below:
    // - put await axios.get(...)
    // - put async before the function name
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    // github returns avatar_url, but we can use avatar by doing this shortsxyntax
    const { name, bio, avatar_url: avatarShortSyntax } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar: avatarShortSyntax
    });

    // let's return the dev created
    return res.json(dev);
  }
};
