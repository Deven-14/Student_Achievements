import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;


export const studentAuthorization = (req, res, next) => {
    
    try {

        const { token } = req;
        const decoded = verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRECT);
        const { student, departmentBatchId } = decoded;
        req.student = student;
        req.departmentBatchId = departmentBatchId;
        return next();

    } catch (err) {
        return res.status(401).json({ error: "Access Token Expired, Refresh Access Token" });
    }

}

export const adminAuthorization = (req, res, next) => {
    
    try {

        const token = req;
        const decoded = verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRECT);
        const { admin } = decoded;
        req.admin = admin;
        return next();
        // return next(); ******

    } catch (err) {
        return res.status(401).json({ error: "Access Token Expired, Refresh Access Token" });
    }
    
}