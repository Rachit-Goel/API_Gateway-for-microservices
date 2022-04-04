const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { startDailyPass } = require("../utils/initialDailyPass");

router.post("/signup", async (req, res) => {
    try {
        const gotuser = await User.findOne({ email: req.body.email });
        gotuser && res.status(403).json("email already existed");

        if(!gotuser){
            const contentArray = await startDailyPass();
            const newuser = new User(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: CryptoJS.AES.encrypt(req.body.password, process.env.secret_key).toString(),
                    content: contentArray
                }
            );
            const saveduser = await newuser.save();
            res.status(201).json(saveduser);
            console.log("auth_post-signup success");
        }
    } 
    catch (error) {
        res.status(500).json(error);
        console.log("Error in auth_post-signup");
    }
});

//can be used for verification of the user
const generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_key
    );
  };

router.post("/login", async (req,res) => {
    try {
        const gotuser = await User.findOne({ email: req.body.email });
        !gotuser && res.status(401).json("email doesn't existed");
        
        const pass = CryptoJS.AES.decrypt(
            gotuser.password, 
            process.env.secret_key
        ).toString(CryptoJS.enc.Utf8);
        pass !== req.body.password && res.status(401).json("Password doesn't matched");

        const accessToken = generateAccessToken(gotuser);
        
        const {password, ...others} = gotuser._doc;

        res.status(200).json({...others, accessToken});
        console.log("auth_post-login success");
    } 
    catch (error) {
        res.status(500).json(error);
        console.log("Error in auth_post-login");
    }
});

module.exports = router;