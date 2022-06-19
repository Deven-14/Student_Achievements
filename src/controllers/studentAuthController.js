import { verify } from "jsonwebtoken";
import { sheets } from "@googleapis/sheets";
import { addStudent } from "./../services/index.js";
import { generateAccessTokenForStudent, generateRefreshTokenForStudent } from "../helpers/token.js";

// exports.register = async (req, res, next) => {

//     try {

//         var { usn, name, email, phone } = req.body;
//         email = email.toLowerCase(); // sanitize: convert email to lowercase
    
//         if (!(email && usn && name && phone)) {
//             return res.status(400).json({ error: "All Inputs are Required" });
//         }
    
//         const oldStudent = await Student.findOne({ email });
    
//         if (oldStudent) {
//             return res.status(409).json({ error: "Student Already Exists, Please Login" });
//         }
        
//         const student = await Student.create({ usn, name, email, phone });
    
//         const token = generateAccessToken(student._id, email);
//         const refreshToken = generateRefreshToken(student._id, email);
//         student.token = token;
//         student.refreshToken = refreshToken;
    
//         // res.status(201).json(student);
//         req.student = student;
//         next();

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// exports.login = async (req, res, next) => {

//     try {
    
//         var { usn, email } = req.body;
//         email = email.toLowerCase(); // sanitize: convert email to lowercase

//         if (!(email && usn)) {
//             return res.status(400).json({ error: "All Inputs are Required" });
//         }

//         const student = await Student.findOne({ email });

//         if (student && usn.localeCompare(student.usn) == 0) {

//             const token = generateAccessToken(student._id, email);
//             const refreshToken = generateRefreshToken(student._id, email);
//             student.token = token;
//             student.refreshToken = refreshToken;

//             // res.status(200).json(student);
//             req.student = student;
//             next();
            
//         } else {
//             res.status(401).json({ error: "Invalid Credentials" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }

// };


export async function signup(req, res) {

    try {

        const student = req.student;
        const departmentBatchId = req.departmentBatchId;

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

        const student = req.student;
        const departmentBatchId = req.departmentBatchId;

        const accessToken = await generateAccessTokenForStudent(student, departmentBatchId);
        const refreshToken = await generateRefreshTokenForStudent(student, departmentBatchId);
        
        return res.status(200).json({ accessToken, refreshToken });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export async function getNewAccessTokenUsingRefreshToken(req, res) {

    try {
  
        const { refreshToken } = req;

        const decoded = verify(refreshToken, process.env.STUDENT_REFRESH_TOKEN_SECRECT);
        const {student, departmentBatchId} = decoded;
        const accessToken = await generateAccessTokenForStudent(student, departmentBatchId);
        return res.status(200).json({ accessToken });
  
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Refresh Token Expired, Login Again" });
    }
    
}