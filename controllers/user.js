//require mongoose and models 
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

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
    





    //put to update a user by its _id





    //delete to remove a user by its _id




    //FRIENDS LIST
    //POST add a new friend to a user's friend list 




    //DELETE to remove a friend from a user's friend list

}
