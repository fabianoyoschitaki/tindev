// {} is a feature called destructuring. Let's say mongoose has Schema inside it:
// mongoose.Schema and mongoose.anotherObject
// so we can use const { Schema, anotherObject } = require("mongoose")
const { Schema, model } = require("mongoose");

// Dev Structure like in the database
const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    //github user
    user: {
      type: String,
      required: true
    },
    // we can directly do this once it's not required
    bio: String,
    // url of the avatar image
    avatar: {
      type: String,
      required: true
    },
    // we'll add user's ids as likes and dislikes
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ]
  },
  // to create a createdAt and updatedAt fields automatically by mongoose for each row in the database
  {
    timestamps: true
  }
);
// any application file that imports this can insert data
module.exports = model("Dev", DevSchema);
