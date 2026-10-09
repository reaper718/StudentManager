const db = require('../utils/db-connections');
const Users = require('../models/users');

const addUser = async (req,res) => {
    try {
        const {username, phoneNumber ,email} = req.body;

        const user = await Users.create({
            username: username,
            phoneNumber: phoneNumber,
            email: email
        })

        res.status(200).send("user created successfully");
    } catch (error) {
        console.log("Error while adding user",error)
        res.status(500).send(error);
    }
}

const getUsers = async (req,res) => {
    try {
        const users = await Users.findAll();

        res.status(201).json(users)
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params;

        const user = await Users.destroy({
            where: {
                id: id
            }
        })

        if(!user){
            res.status(404).send("user not found");
            return;
        }

        res.status(200).send("user deleted");

    } catch (error) {
        console.log("Error while deleting user",error)
        res.status(500).send(error);
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, phoneNumber, email } = req.body;

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        await user.update({
            username,
            phoneNumber,
            email
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error while editing user:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    editUser
}