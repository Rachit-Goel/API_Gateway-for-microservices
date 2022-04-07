const router = require("express").Router();
const axios = require("axios");
const Content = require("../models/Content");

router.post("/upload", async (req, res) => {
    var count=0;
    contentItems = req.body.content;
    for(item of contentItems){
        const newcontent = new Content(item); 
        try {
            const savedcontent = await newcontent.save();
            await axios.post(`http://${process.env.BASE_URL}:3000/users/daily-pass/saveunlockch`,{
                "c_Id" : savedcontent._id
            });

            count++;
            console.log("content-upload success");
        } 
        catch (error) {
            res.status(500).json(error);
            console.log("Error in content-upload");
            return;
        }
    }
    res.send(`Total new content uploaded = ${count}`);
});

router.get("/fetchall", async (req,res)=>{
    try {
        const content = await Content.find()
        res.send(content);
        console.log("content-fetchall success");
    } 
    catch (err) {
        res.status(500).json(error);
        console.log("Error in content-fetchall");
    }
});

router.post("/usercontent", async (req,res)=>{
    const userId = req.body.userId;
    try {
        const userUnlockedCh = await axios.get(`http://${process.env.BASE_URL}:3000/users/daily-pass/fetch/${userId}`);
        let userContent = [];

        for(item of userUnlockedCh.data){
            const itemMeta = await Content.findOne({ _id: item.c_Id });
            const Totalchapters = itemMeta.Totalchapters;
            userContent.push({...item, Totalchapters});
        }

        res.send(userContent);
        console.log("content-userContent success");
    } 
    catch (err) {
        res.status(500).json(err);
        console.log("Error in content-userContent");
    }
});

router.put("/update/:id", (req, res) => {
    //can write update logic here
});

router.delete("/delete/:id", (req, res) => {
    //can write delete user logic here
});


module.exports = router;