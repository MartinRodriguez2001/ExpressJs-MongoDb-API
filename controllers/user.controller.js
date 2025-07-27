const User = require("../models/User.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log("All users fetched successfully");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const User = await User.findById(id);

        if (!User){
            res.status(404).json({message: "User not found"});
        }

        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const updatedUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body)

        if (!user){
            res.status(404).json({message: "User not found"});
        }   
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const deleteProduct = async (req, res) => {
        try {
            const {id} = req.params;
            const user = await User.findByIdAndDelete(id);

            if (!user){
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({message: "User deleted successfully"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    updatedUser,
    deleteProduct,
    createUser
}

