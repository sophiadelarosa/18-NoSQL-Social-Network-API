//require express
const router = require('express').Router();

//require functions from user controller
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user');

// /api/user
// get all users, create user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
// get one user by id, update user by id, delete one user by id
router.route('/:userId').get(getOneUser).put(updateUser).post(addFriend).delete(deleteUser);

// /api/user/:userId/friends
// add a friend
router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;