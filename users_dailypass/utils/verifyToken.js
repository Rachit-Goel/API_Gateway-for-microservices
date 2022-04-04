const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if(!authToken)
        return res.status(401).json("Provide correct Auth Token");

    const token = authToken.split(" ")[1];
    
    try {
        await jwt.verify(token, process.env.JWT_key, (err, tokenData) => {
            if(!tokenData || err)
                return res.status(403).json("Invalid/Expired Token");
            req.tokenUserData=tokenData;
            next();
        });
        
    } catch (error) {
        res.json(error);
    }
    
}

module.exports = { verifyToken };
