const bcrypt = require('bcryptjs');
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

const update = async (id, info) => {
    const user = await getById(id);

    if (!user) { return false }

    const { oldPassword, newPassword } = info;
    let updatedInfo = {};

    if (oldPassword && newPassword) {
        const _newPassword = genPassword(newPassword);
        
        console.log(oldPassword);
        console.log(_newPassword);
        console.log(user.password);

        if (!validatePassword(oldPassword, _newPassword) && validatePassword(oldPassword, user.password)) {
            updatedInfo.password = _newPassword;
        } else {
            return false;
        }
    }

    try {
        User.updateOne({ _id: id }, updatedInfo);
        return true;
    } catch (error) {
        return false;
    }
}

const validatePassword = (password, confirmPassword) => {
    return bcrypt.compareSync(password, confirmPassword);
}

module.exports = {
    genPassword,
    getByEmail,
    getById,
    create,
    update,
    validatePassword
}