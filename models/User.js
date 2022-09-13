//User is a model

const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: 
        {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: 
        {
            type: String,
            unique: true,
            required: true,
            //must match a valid email address
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        //array of _id referencing thought model
        thoughts: 
        [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        //array of _id referencing the user model (self-reference)
        friends: 
        [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: 
        {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

//SCHEMA SETTINGS
// get total count of friends, retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the Users model using the Users Schema
const User = model('User', UserSchema);

module.exports = User;

