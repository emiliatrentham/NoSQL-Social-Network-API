const router = require('express').Router();

const {
    getUser,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUser)
.post(addUser);

// /api/users/:id
router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/:id/friends/:friendId

router.route('/:userId/friends/:friendID')
.post(addFriend)
.delete(deleteFriend)


module.exports = router;