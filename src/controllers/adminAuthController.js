import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
import { generateAccessTokenForAdmin, generateRefreshTokenForAdmin } from "./../helpers/index.js";


export async function signin(req, res) {
    try {

        const { admin } = req;
    
        const accessToken = await generateAccessTokenForAdmin(admin);
        const refreshToken = await generateRefreshTokenForAdmin(admin);
    
        return res.status(200).json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function generateAccessTokenUsingRefreshToken(req, res) {

    try {
  
        const refreshToken = req.token;
        const decoded = verify(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRECT);
        const { admin } = decoded;
        console.log("Generating new access token for admin", admin.email);
        const accessToken = await generateAccessTokenForAdmin(admin);
        return res.status(200).json({ accessToken });
  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Refresh Token Expired, Login Again" });
    }
    
}