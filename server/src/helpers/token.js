const jwt = require("jsonwebtoken");

function generateAccessToken(id, email) {
    return jwt.sign(
        { user_id: id, email },
        process.env.ACCESS_TOKEN_SECRECT,
        { expiresIn: "2h" }
    );
}


function generateRefreshToken(id, email) {
    return jwt.sign(
        { user_id: id, email },
        process.env.REFRESH_TOKEN_SECRECT,
        { expiresIn: "1d" }
    );
}

module.exports = { generateAccessToken, generateRefreshToken };