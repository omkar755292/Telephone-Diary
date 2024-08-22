const express = require('express');
const { userRegister, userLogin, rootUser } = require('../controller/userController');
const validateToken = require('../middleware/validateToken');

const userRouter = express.Router();

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/root').get(validateToken,rootUser);

module.exports = userRouter;