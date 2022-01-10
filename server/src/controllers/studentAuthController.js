const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../helpers/token");
const Student = require("../models/Student"); // importing student context


exports.register = async (req, res, next) => {

    try {

        var { usn, name, email, phone } = req.body;
        email = email.toLowerCase(); // sanitize: convert email to lowercase
    
        if (!(email && usn && name && phone)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }
    
        const oldStudent = await Student.findOne({ email });
    
        if (oldStudent) {
            return res.status(409).json({ error: "Student Already Exists, Please Login" });
        }
        
        const student = await Student.create({ usn, name, email, phone });
    
        const token = generateAccessToken(student._id, email);
        const refreshToken = generateRefreshToken(student._id, email);
        student.token = token;
        student.refreshToken = refreshToken;
    
        // res.status(201).json(student);
        req.student = student;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login = async (req, res, next) => {

    try {
    
        var { usn, email } = req.body;
        email = email.toLowerCase(); // sanitize: convert email to lowercase

        if (!(email && usn)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }

        const student = await Student.findOne({ email });

        if (student && usn.localeCompare(student.usn) == 0) {

            const token = generateAccessToken(student._id, email);
            const refreshToken = generateRefreshToken(student._id, email);
            student.token = token;
            student.refreshToken = refreshToken;

            // res.status(200).json(student);
            req.student = student;
            next();
            
        } else {
            res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

};


exports.refreshToken = async (req, res) => {
  
    const token = req.body.refreshToken || req.query.refreshToken;// || req.headers["x-access-token"];
  
    if (!token) {
        return res.status(400).json({ error: "Access denied, Token missing!" });
    }
    try {
  
        var { usn, email } = req.body;
        email = email.toLowerCase(); // sanitize: convert email to lowercase

        if (!(email && usn)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }

        const student = await Student.findOne({ email });

        if (student && usn.localeCompare(student.usn) == 0) {
    
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRECT);
            const { user_id, email } = decoded;
            const accessToken = generateAccessToken(user_id, email);
            res.status(200).json({ accessToken });
    
        } else {
            res.status(401).json({ error: "Invalid Credentials" });
        }
  
    } catch (err) {
        return res.status(401).json({ error: "Refresh Token Expired, Login Again" });
    }
    
};