import { sheets } from "@googleapis/sheets";
import { Student } from "./../interfaces/index.js";
import { isStudentSignedUp, getStudent, isPhoneNumberValid, isUSNValid } from "./../services/student/index.js";

export async function signupValidation(req, res, next) {

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
        
        const isSignedUp = await isStudentSignedUp(sheets, student);
        if (isSignedUp) {
            return res.status(409).json({ error: "Student Already Exists, Please Login" });
        }
        
        req.student = student;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function signinValidation(req, res, next) {

    try {

        const { usn, email } = req.body;

        if (!(email && usn)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }

        if(!isUSNValid(usn)) {
            return res.status(400).json({ error: "Enter a Valid USN" });
        }
        
        const student = await getStudent(sheets, usn, email);
        if (!student) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        
        req.student = student;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}