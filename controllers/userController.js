const User = require('../models/user');


const getUsers = async (req, res) => {
    const users = await User.find(); 
    res.json(users);
};


const getAUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.find(id); 
    res.status(200).json({
        status: "success",
        message: "user retrieved successfully",
        data: {
            user
        }
    });
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        await User.findByIdAndDelete(id);
        console.log("Deleting user with ID:", id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { deleteUser, getUsers, getAUser };
