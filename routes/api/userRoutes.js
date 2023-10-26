const router = require("express").Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../controllers/userController");

//routes for getting all users and creating new users
router.route("/").get(getUsers).post(createUser);

// routes for getting a single user by their id, updating a single user and deleting a single user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// routes for adding a single friend or deleing a single friend.
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;