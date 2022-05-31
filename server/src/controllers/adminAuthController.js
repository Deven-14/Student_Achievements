const global_data = require('../auth/global_data');
const auth = require('../auth/get_auth');
const get_batches = require("../helpers/get_batches");
const is_lecturer = require("../helpers/is_lecturer");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../helpers/token");
const Admin = require("../models/Admin"); // importing admin context


exports.verify = async (req, res) => {

    try {

        var { name, email } = req.body;
        email = email.toLowerCase(); // sanitize: convert email to lowercase
    
        if (!(email  && name )) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }
    
        var admin = await Admin.findOne({ email });
    
        if (!admin && await is_lecturer(email)) {
            // return res.status(409).json({ error: "Admin Already Exists, Please Login" });
            admin = await Admin.create({ name, email });
        } else if(!(await is_lecturer(email))){
            return res.status(400).json({ error: "Not a lecturer" });
        }
    
        const token = generateAccessToken(admin._id, email);
        const refreshToken = generateRefreshToken(admin._id, email);
        admin.token = token;
        admin.refreshToken = refreshToken;

        var all_batches = await get_batches(auth, global_data.index_table_id);
    
        res.status(201).json({ admin, all_batches, departments: global_data.all_departments });
        // req.admin = admin;
        // next();

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
  
        var { email } = req.body;
        email = email.toLowerCase(); // sanitize: convert email to lowercase

        if (!email) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }

        const admin = await Admin.findOne({ email });

        if (admin && await is_lecturer(email)) {
    
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