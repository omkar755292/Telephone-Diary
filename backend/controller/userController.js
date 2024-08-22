const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//desc: register new user
//route: POST /api/user/register
//acces: public
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(401);
        throw new Error("All Field are Mandatort");
    }
    //check user exist or not
    const userExits = await userModel.findOne({ email });
    if (userExits) {
        res.status(404);
        throw new Error("User already Exist");
    }
    //hash password
    const hashpassword = await bycrypt.hash(password, 10);
    //created user
    const user = await userModel.create({
        username,
        email,
        password: hashpassword
    });
    res.status(201).json(user);
});

//desc: Login exsiting user
//route: POST /api/user/login
//acces: public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401);
        throw new Error("All Fileds are mandatory");
    }
    // check user exits or not
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User Does not Exits");
    }
    //compare enter password and hashpassword
    let passwordMatch = await bycrypt.compare(password, user.password);

    //creating accessToken
    if (passwordMatch && user) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid Password or Email");
    }

});


//desc: Excessing detail of user
//route: GET /api/user/root
//acces: private
const rootUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { userRegister, userLogin, rootUser };