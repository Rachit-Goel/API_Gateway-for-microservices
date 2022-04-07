const router = require("express").Router();
const {verifyToken} = require("../utils/verifyToken")
const User = require("../models/User");

router.post("/unlockone", async (req,res)=>{
    const userId = req.body.userId;
    const contentId = req.body.contentId;
    
    try {
        const gotUser = await User.findOne({ _id: userId })
        const content = gotUser.content;
        var unlockedCount = 4;
        for(item of content){
            if(item.c_Id == contentId){ 
                unlockedCount = item.unlockedCh;
                break;
            }
        }
        unlockedCount++;
        await User.updateOne(
        {
            _id : userId,
            "content": {
                "$elemMatch": {
                    "c_Id": contentId
                }
            }
        }, 
        {
          "$set": {
              "content.$.unlockedCh": unlockedCount
          }
        });

        res.send("daily-pass-unlockOne success");
        console.log("daily-pass-unlockOne success");
    } 
    catch (err) {
        res.status(500).json(err);
        console.log("Error in daily-pass-unlockOne");
    }
});

router.get("/fetch/:id", async (req,res)=>{
    try {
        const user = await User.findOne({ _id : req.params.id })
        res.send(user.content);
        console.log("daily-pass-fetch success");
    } 
    catch (err) {
        res.status(500).json(err);
        console.log("Error in daily-pass-fetch");
    }
});

router.post("/saveunlockch", async (req,res)=>{
    try {
        const contentId = req.body.c_Id;
        await User.updateMany({}, 
        {
            "$push": {
                "content": {
                    "c_Id" : contentId,
                    "unlockedCh" : 4
                } 
            }
        });
        res.send(`unlockedch saved for all users`);
        console.log(`daily-pass-saveunlockch success, unlockedch saved for all users`);
    } 
    catch (err) {
        res.status(500).json(err);
        console.log("Error in daily-pass-saveunlockch");
    }
});

module.exports = router;