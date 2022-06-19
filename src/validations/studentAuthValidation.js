import { sheets } from "@googleapis/sheets";
import { Student } from "./../interfaces/index.js";
import { isPhoneNumberValid, isUSNValid } from "./../helpers/ValidateUSNAndPhoneNumber.js";
import { getStudentDepartmentBatchId, isStudentSignedUp, getStudent } from "./../services/index.js";

export async function studentSignUpValidation(req, res, next) {

    try {

        const student = new Student(req.body);
    
        if (!(student.email && student.usn && student.name && student.phone)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }

        if(!isUSNValid(student.usn)) {
            return res.status(400).json({ error: "Enter a Valid USN" });
        }

        if(!isPhoneNumberValid(student.phone)) {
            return res.status(400).json({ error: "Enter a Valid Phone Number" });
        }

        const departmentBatchId = await getStudentDepartmentBatchId(student.usn);
        
        if (isStudentSignedUp(sheets, student, departmentBatchId)) {
            return res.status(409).json({ error: "Student Already Exists, Please Login" });
        }
        
        req.student = student;
        req.departmentBatchId = departmentBatchId;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function studentSignInValidation(req, res, next) {

    try {

        const { usn, email } = req.body;

        if (!(email && usn)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }

        if(!isUSNValid(usn)) {
            return res.status(400).json({ error: "Enter a Valid USN" });
        }

        const departmentBatchId = await getStudentDepartmentBatchId(usn);
        
        const student = await getStudent(sheets, usn, email, departmentBatchId);
        if (!student) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        
        req.student = student;
        req.departmentBatchId = departmentBatchId;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function refreshTokenValidation(req, res, next) {

    try {

        const refreshToken = req.body.refreshToken || req.query.refreshToken;// || req.headers["x-access-token"];
  
        if (!refreshToken) {
            return res.status(400).json({ error: "Access denied, Refresh Token missing!" });
        }
        
        req.refreshToken = refreshToken;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}