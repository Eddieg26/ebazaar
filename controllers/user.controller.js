const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const genPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

const getByEmail = async (email) => {
    return User.findOne({ email });
}

const getById = async (userId) => {
    return User.findById(userId);
}

const create = async (user) => {
    return await new User(user).save();
}

const update = async (info) => {
    return await User.updateOne({ _id: info.id}, { ...info });
}

module.exports = {
    genPassword,
    getByEmail,
    getById,
    create,
    update
}