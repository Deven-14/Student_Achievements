import { verify } from "jsonwebtoken";
import { generateAccessTokenForAdmin, generateRefreshTokenForAdmin } from "./../helpers/token.js";


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


export async function getNewAccessTokenUsingRefreshToken(req, res) {

    try {
  
        const { refreshToken } = req;

        const decoded = verify(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRECT);
        const { admin } = decoded;
        const accessToken = await generateAccessTokenForAdmin(admin);
        return res.status(200).json({ accessToken });
  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Refresh Token Expired, Login Again" });
    }
    
}