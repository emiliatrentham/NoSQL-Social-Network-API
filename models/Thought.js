const mongoose = require('mongoose');

// Reaction Schema
const reactionSchema =
  new mongoose.Schema(
    {
      reactionId: [
        {
          type: mongoose.Schema.Types
            .ObjectId,
          default: () =>
            new Types.ObjectId(),
        },
      ],
      reactionBody: [
        {
          type: String,
          required: true,
          maxLength: 280,
        },
      ],
      username: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal),
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  // Thought Schema
const thoughtSchema =
  new mongoose.Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
      },
      username: {
        type: String,
        required: true,
      },
     
    // Directly nested
      reactions: [
       reactionSchema
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

// Create the thought model using the thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);
// Export the Thought model
module.exports = Thought;

