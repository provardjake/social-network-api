const router = require("express").Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

//routes for getting all thoughts and posing a thought
router.route("/").get(getThoughts).post(createThought);

// routes for getting single thought, updating a thought and deleting a thought
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

//route for creating a new reaction
router.route("/:thoughtId/reactions").post(createReaction);

//route for deleting a reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;