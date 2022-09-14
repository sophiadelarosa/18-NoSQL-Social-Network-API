//require express
const router = require('express').Router();

//require functions from thought controller
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought');

// /api/thoughts
// get all thoughts, create thought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// get one thought, update a thought, delete a thought
router.route('/:thoughtId').get(getOneThought).post(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// create a reaction
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// pull a reaction from a single thought, to delete by it's reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;