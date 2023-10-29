const { response } = require("express");
const {User, Thought} = require("../models");

module.exports = {

    //route that gets all users
    async getUsers(req, res){
        try{
            const users = await User.find()
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .select("-__v");

            res.json(users);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //route that creates a new user
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }
        catch(err){
            console.log(err);
            return response.status(500).json(err);
        }
    },

    // route that gets a single user by the id
    async getSingleUser(req, res){
        try{
            const user = await User.findOne({_id: req.params.userId})
            .populate({
                path: "thoughts",
                select: "-__v"
            });
            
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            res.json(user);
        }
        catch(err){
            console.log(err);
            return response.status(500).json(err);
        }
    },

    // route that updates a user
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            res.json(user);
        }
        catch(err){
            console.log(err);
            return response.status(500).json(err);
        }
    },

    // route that deletes a user
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete({_id: req.params.userId});

            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            await Thought.deleteMany({_id: {$in: user.thoughts}});

            res.json({message: "User deleted."});
        }
        catch(err){
            console.log(err);
            return response.status(500).json(err);
        }
    },

    // route that adds a friend to another users friends list
    async addFriend(req, res){
        try{
            const friend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: { friends: req.params.friendId }},
                {runValidators: true, new: true}
            );

            if(!friend){
                res.status.json({message: "User not found"});
            }

            res.json(friend);
        }
        catch(err){
            console.log(err);
            return response.status(500).json(err);
        }
    },

    // route that deletes a friend from a friends list
    async removeFriend(req, res){
        try{
            const friend = await findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );

            if(!friend){
                return res.status(404).json({message: "User not found"});
            }

            res.json(friend, {message: "Friend removed"});
        }
        catch(err){
            console.log(err);
            return response.status(500).json(err);
        }
    }
}