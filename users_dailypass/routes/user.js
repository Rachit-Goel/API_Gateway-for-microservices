const router = require("express").Router();
const {verifyToken} = require("../utils/verifyToken")
const User = require("../models/User");

router.get("/fetchall", async (req,res)=>{
    try {
        const users = await User.find()
        res.send(users);
        console.log("users-fetchall success");
    } 
    catch (err) {
        res.status(500).json(error);
        console.log("Error in users-fetchall");
    }
});


router.put("/update/:id", verifyToken, (req, res) => {
    if(req.tokenUserData.id === req.params.id){
        //can write update logic here
        res.status(200).json("Token verified & you can update");
    }
    else{
        res.status(403).json("Token verified but you have no permission to update");
    }
    console.log("users_put-update call success");
});

router.delete("/delete/:id", verifyToken, (req, res) => {
    //can write delete user logic here
});


module.exports = router;