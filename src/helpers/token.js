import { sign } from "jsonwebtoken";

export function generateAccessToken(id, email) {
    return sign(
        { user_id: id, email },
        process.env.ACCESS_TOKEN_SECRECT,
        { expiresIn: "30d" }
    );
}


export function generateRefreshToken(id, email) {
    return sign(
        { user_id: id, email },
        process.env.REFRESH_TOKEN_SECRECT,
        { expiresIn: "60d" }
    );
}