import { Admin } from "./../interfaces/index.js";
import { isAdmin } from "./../services/admin/index.js";

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