const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
   // Gets all thoughts
   Thought.find({})
   .then(thoughtData => res.json(thoughtData))
   .catch(err => {
       console.log(err);
       res.status(400).json(err);
   });
  },
  // get single thought
  getThoughtByID(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No Thought found with this ID!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create a thought and push the created thought's _id to the associated user's thoughts array field
  addThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'Incorrect thought data!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No user found with this ID!'})
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
      Thought.findByIdAndDelete({ _id: req.params.thoughtId },
        { runValidators: true, new: true })
      .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.json(err));
  },
  //create reaction
    addReaction(req, res) {
      // addReaction({ params, body }, res) ?
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'Incorrect reaction data!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
    },
    // Delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
      //  { $pull: { reactions: { reactionId: params.reactionId } } } ??
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
