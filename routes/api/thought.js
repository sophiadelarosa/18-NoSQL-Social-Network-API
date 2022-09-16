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

// /api/thought
// get all thoughts, create thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
// get one thought, update a thought, delete a thought
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtId/reactions
// create a reaction
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thought/:thoughtId/reactions/:reactionId
// pull a reaction from a single thought, to delete by it's reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;