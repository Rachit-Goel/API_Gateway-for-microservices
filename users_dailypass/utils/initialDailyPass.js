const axios = require("axios");
const User = require("../models/User");

const startDailyPass = async () => {
  try {
    const res = await axios.get(`http://${process.env.BASE_URL}:3000/content/fetchall`);
    const content = res.data;
    // console.log(content);
    const array = [];
    for(item of content){
        array.push({
            "c_Id": item._id,
            "unlockedCh": 4,
        });
    }
    return array;
  } 
  catch (error) {
    console.log(error);
  }
};

module.exports = { startDailyPass };
