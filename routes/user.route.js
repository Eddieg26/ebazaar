const express = require('express');
const asynchandler = require('express-async-handler');
const userController = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

const signin = async (req, res) => {
    const email = req.body.email;
    let user = await userController.getByEmail(email);
    return res.json(user);
}

const signout = async (req, res) => {

}

const signup = async (req, res) => {
    const userInfo = Object.assign({}, req.body, { password: userController.genPassword(req.body.password) });
    let user = await userController.create(userInfo);
    return res.json(user);
}

const update = async (req, res) => {
    let info = req.body;
    await userController.update(info);

    const user = await userController.getById(info.id);
    return res.json(user);
}

router.route('/signout').get(asynchandler(signout));
router.route('/signin').post(asynchandler(signin));
router.route('/signup').post(asynchandler(signup));
router.route('/update').patch(asynchandler(update));