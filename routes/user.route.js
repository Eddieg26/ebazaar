const express = require('express');
const asynchandler = require('express-async-handler');
const userController = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

const signin = async (req, res) => {
    const { email, password } = req.body;
    let user = await userController.getByEmail(email);
    if (userController.validatePassword(password, user.password)) {
        return res.json(user)
    } else
        return res.json(null);
}

const signout = async (req, res) => {
    return res.status(200).json({messsage: 'success'});
}

const signup = async (req, res) => {
    const userInfo = Object.assign({}, req.body, { password: userController.genPassword(req.body.password) });
    let user = await userController.create(userInfo);
    return res.json(user);
}

const update = async (req, res) => {
    let info = req.body;
    let userId = req.params.userId;
    const result = await userController.update(userId, info);

    if (result) {
        const user = await userController.getById(userId);
        return res.json(user);
    } else {
        return res.json(null);
    }
}

router.route('/signout').get(asynchandler(signout));
router.route('/signin').post(asynchandler(signin));
router.route('/signup').post(asynchandler(signup));
router.route('/update/:userId').patch(asynchandler(update));