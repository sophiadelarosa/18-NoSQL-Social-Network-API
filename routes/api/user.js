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

// /api/users
// get all users, create user
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// get one user by id, update user by id, delete one user by id
router.route('/:userId').get(getOneUser).post(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;