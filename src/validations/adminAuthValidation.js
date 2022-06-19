import { Admin } from "./../interfaces/index.js";
import isAdmin from "./../helpers/isAdmin.js";

export async function signinValidation(req, res, next) {

    try {

        const admin = new Admin(req.body);
    
        if (!(admin.email  && admin.name)) {
            return res.status(400).json({ error: "All Inputs are Required" });
        }
        
        if (!await isAdmin(admin.email)) {
            return res.status(400).json({ error: "Not an Admin" });
        }
    
        req.admin = admin;
        return next();

    } catch (err) {
        console.log(err);
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