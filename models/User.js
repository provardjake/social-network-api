const {Schema, model} = require("mongoose");


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //validator regex for matching an email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Email address not valid"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// returns how many friends a user has
userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;