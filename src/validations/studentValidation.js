import { Achievement } from "./../interfaces/index.js";


export async function addAchievementValidation(req, res, next) {

    try {

        const { student } = req;
        const achievement = new Achievement(student, req.body); 
        // check if yearOfAchievement is integer or string

        // check if default value of certificateUrl is "None"
        if(!(achievement.nameOfEvent && achievement.detailsOfEvent && achievement.award 
            && achievement.level && achievement.yearOfAchievement && achievement.certificateUrl)) {
            return res.status(400).json({ error: "Data Missing" });
        }

        req.achievement = achievement;
        return next();    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function uploadCertificateValidation(req, res, next) {
    try {

        if(!(req.files && req.files.certificate)) {
            return res.status(400).json({ error: "No Certificate Uploaded" });
        }
        return next();
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}