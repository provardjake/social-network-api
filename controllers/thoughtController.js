const {User, Thought} = require("../models");
const { findOneAndDelete } = require("../models/Thought");

module.exports = {
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId}.select("-__v"));

            if(!thought){
                return res.status(404).json("Thought not found");
            }

            res.json(thought);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!thought){
                return res.status(404).json({message: "Thought not found"});
            }

            res.json(thought);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res){
        try{
            const thought = await findOneAndDelete({_id: req.params.thoughtId});

            if(!thought){
                return res.status(404).json({message: "Thought not found"});
            }

            res.json({message: "Thought deleted"});
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createReaction(req, res){
        try{
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            if(!reaction){
                return res.status(404).json({message: "Thought not found"});
            }

            res.json(reaction);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res){
        try{
            const reaction = await Thought.findOneAndUpdate(
                {_id: rea.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );

            if(!reaction){
                return res.status(404).json({message: "Thought not found"});
            }

            res.json({message: "Reaction deleted"});
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    }
}