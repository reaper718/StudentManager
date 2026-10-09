const {Sequelize ,DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connections');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Users;
