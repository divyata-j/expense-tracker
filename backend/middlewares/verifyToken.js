const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing or improperly formatted");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1]; 
        // console.log("Extracted Token: ", token);

        const jwtSecretKey = process.env.TOKEN_KEY;
        const verified = jwt.verify(token, jwtSecretKey);
        // console.log("Decoded Token: ", verified);

        if (verified) {
            if (!verified.email || !verified.id) {
                res.status(401);
                throw new Error("Invalid token");
            }
            req.body.id = verified.id;
            next();
        } else {
            throw new Error("Token expired");
        }
    } catch (err) {
        console.log("VerifyToken Error: ", err.message);
        res.status(401).json({ message: err.message });
    }
}

module.exports = { verifyToken };
