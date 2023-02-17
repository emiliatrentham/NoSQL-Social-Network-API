// Week 18 - Activity 17

const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter your email',
        ],
        unique: true,
      },
      //Array of `_id` values referencing the `Thought` model
      thoughts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      //Array of `_id` values referencing the `User` model (self-reference)
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

// Create a virtual property `friendCount` that gets all friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the UserSchema
const User = mongoose.model('User', userSchema);
// Export the User model
module.exports = User;


