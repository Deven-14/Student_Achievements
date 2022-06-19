import { verify } from "jsonwebtoken";


export const verifyStudentToken = (req, res, next) => {
    
    try {

        const token = req.headers["x-access-token"]; // req.body.token || req.query.token || 

        if (!token) {
            return res.status(400).json({ error: "Access denied, Token missing!" });
        }

        const decoded = verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRECT);
        const { student, departmentBatchId } = decoded;
        req.student = student;
        req.departmentBatchId = departmentBatchId;
        return next();

    } catch (err) {
        return res.status(401).json({ error: "Access Token Expired, Refresh Access Token" });
    }

}

export const verifyAdminToken = (req, res, next) => {
    
    try {

        const token = req.headers["x-access-token"]; // req.body.token || req.query.token || 

        if (!token) {
            return res.status(400).json({ error: "Access denied, Token missing!" });
        }

        const decoded = verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRECT);
        const { admin } = decoded;
        req.admin = admin;
        return next();
        // return next(); ******

    } catch (err) {
        return res.status(401).json({ error: "Access Token Expired, Refresh Access Token" });
    }
    
}