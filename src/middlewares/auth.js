import { verify } from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]; // req.body.token || req.query.token || 

    if (!token) {
        return res.status(400).json({ error: "Access denied, Token missing!" });
    }
    try {
        const decoded = verify(token, process.env.ACCESS_TOKEN_SECRECT);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: "Token Expired, Refresh Token" });
    }
    return next();
};

export default verifyToken;