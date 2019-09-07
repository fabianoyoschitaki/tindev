const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    console.log(`You: ${user}`);
    console.log(`User you disliked: ${devId}`);
    // get current user
    const loggedDev = await Dev.findById(user);
    // get user to send like
    const targetDev = await Dev.findById(devId);

    // if the user we want to like does not exist
    if (!targetDev) {
      console.log(`Target ${devId} does not exist.`);
      return res.status(400).json({ error: "Dev does not exist!" });
    }

    // add the user id to our dislikes array
    loggedDev.dislikes.push(targetDev._id);
    // save to the database
    await loggedDev.save();

    return res.json(loggedDev);
  }
};
