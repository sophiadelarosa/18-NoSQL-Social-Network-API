//thought is a model that requires the reaction subdocument schema

const { Schema, model, types } = require('mongoose');
//moment required for date in thought schema
const moment = require('moment');

//Reaction schema
const ReactionSchema = new Schema (
    {
        //I MADE THE REACTION ID, JUST REMOVED IT BC IT MAKES INSOMNIA BUG OUT SINCE AN ID IS AUTOMATICALLY GENERATED
        //reactionId:  {
            //type: Schema.Types.ObjectId,
            //default: ()=> new types.ObjectId()
        //},
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

//Thought schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//SCHEMA SETTINGS
//total reaction count, retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//create thoughts model using the thoughts schema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
