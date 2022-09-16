//require mongoose and models 
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts, Thought } = require('../models');

//export these functions to be called in routes
module.exports = {
    //get all the thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //get a single thought by its _id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with that id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //post to create a new thought (also push the created thought's _id to the associated user's thoughts array field)
    createThought(req, res) {
        
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body }},
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user 
                ? res.status(404).json({ message: 'No user found with that id.' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //put to update a thought by its id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete to remove a thought by its id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    //REACTIONS
    //post to create a reaction stored in a single thoughts reactions array field
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought    
            ? res.status(404).json({ message: 'No thought found with this id.' })
            : res.json({ message: 'Reaction successfully added to thought!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete a reaction by the reaction's reactionId value 
    //deleteReaction(req, res) {
        //Reaction.findOneAndDelete({ _id: req.params.reactionId })
        //.then((reaction) => 
            //!reaction 
                //? res.status(404).json({ message: 'No reaction found with this id.' })
                //: res.json({ message: 'Reaction successfully removed!' })
        //)
        //.catch((err) => res.status(500).json(err));
    //}
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reaction}}},
            { runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought found with that id.' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};
