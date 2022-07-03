import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
import { sheets } from "@googleapis/sheets";
import { addStudent } from "./../services/student/index.js";
import { generateAccessTokenForStudent, generateRefreshTokenForStudent } from "./../helpers/index.js";


export async function signup(req, res) {

    try {

        const { student } = req;

        const accessToken = await generateAccessTokenForStudent(student);
        const refreshToken = await generateRefreshTokenForStudent(student);

        await addStudent(sheets, student);
        
        return res.status(201).json({ accessToken, refreshToken });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}


export async function signin(req, res) {

    try {

        const { student } = req;

        const accessToken = await generateAccessTokenForStudent(student);
        const refreshToken = await generateRefreshTokenForStudent(student);
        
        return res.status(200).json({ accessToken, refreshToken });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function generateAccessTokenUsingRefreshToken(req, res) {

    try {
  
        const refreshToken = req.token;
        const decoded = verify(refreshToken, process.env.STUDENT_REFRESH_TOKEN_SECRECT);
        const { student } = decoded;
        console.log("Generating new access token for student", student.email);
        const accessToken = await generateAccessTokenForStudent(student);
        return res.status(200).json({ accessToken });
  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Refresh Token Expired, Login Again" });
    }
    
}