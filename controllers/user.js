//require mongoose and models 
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts, Thought } = require('../models');

//export these functions to be called in routes
module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //get a single user by _id
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID.' })
            : res.json(user)
            )
    },
    //post a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //put to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    //delete to remove a user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that id!' })
            : Thought.deleteMany({ _id: {$in: user.thoughts}})
        )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    //FRIENDS LIST
    //POST add a new friend to a user's friend list 
    addFriend(req, res) {
        console.log(`Now adding friend to friend's list`);
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet : { friends: req.body }},
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user found with that ID :(' })
            : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    //DELETE to remove a friend from a user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friend}}},
            { runValidators: true, new: true}
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user found with that ID :(' })
        : res.json(user)
        )
    .catch((err) => res.status(500).json(err));
    },
};
