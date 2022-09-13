//require mongoose and models 
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

//export these functions to be called in routes
module.exports = {
//get all the thoughts



//get a single thought by its _id




//post to create a new thought (also push the created thought's _id to the associated user's thoughts array field)





//put to update a thought by its id





//delete to remove a thought by its id



//REACTIONS
//post to create a reaction stored in a single thoughts reactions array field




//delete to remove a reaction by the reaction's reactionId value 




}