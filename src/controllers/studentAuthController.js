import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
import { sheets } from "@googleapis/sheets";
import { addStudent } from "./../services/index.js";
import { generateAccessTokenForStudent, generateRefreshTokenForStudent } from "./../helpers/index.js";


export async function signup(req, res) {

    try {

        const { student, departmentBatchId } = req;

        const accessToken = await generateAccessTokenForStudent(student, departmentBatchId);
        const refreshToken = await generateRefreshTokenForStudent(student, departmentBatchId);

        await addStudent(sheets, student, departmentBatchId);
        
        return res.status(201).json({ accessToken, refreshToken });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}


export async function signin(req, res) {

    try {

        const { student, departmentBatchId } = req;

        const accessToken = await generateAccessTokenForStudent(student, departmentBatchId);
        const refreshToken = await generateRefreshTokenForStudent(student, departmentBatchId);
        
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
        const { student, departmentBatchId } = decoded;
        const accessToken = await generateAccessTokenForStudent(student, departmentBatchId);
        return res.status(200).json({ accessToken });
  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Refresh Token Expired, Login Again" });
    }
    
}