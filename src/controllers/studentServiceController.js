import fs from "fs";
import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import { Achievement } from "./../interfaces/index.js";
import { addFileToTempFolder } from "./../helpers/addFileToTempFolder.js";
import { addStudentAchievement, getAchievementsOfAStudent, uploadAchievementCertificate } from "./../services/index.js";


export async function uploadCertificate(req, res) {
    try {

        if(!(req.files && req.files.certificate)) {
            return res.status(400).json({ error: "No Certificate Uploaded" });
        }

        const { student, departmentBatchId } = req;

        const file = req.files.certificate;
        const filename = `${Date.now()}.pdf`;
        const filepath = await addFileToTempFolder(file, filename);
        const certificateUrl = await uploadAchievementCertificate(drive, filepath, student, departmentBatchId);
        fs.unlink(filepath, (error) => {
            // console.log("file deleted");
        });

        return res.status(201).json({ certificateUrl });
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function addAchievement(req, res) {

    try {

        const { student, departmentBatchId } = req;
        const achievement = new Achievement(student, req.body); 
        // check if yearOfAchievement is integer or string

        // check if default value of certificateUrl is "None"
        if(!(achievement.nameOfEvent && achievement.detailsOfEvent && achievement.award 
            && achievement.level && achievement.yearOfAchievement && achievement.certificateUrl)) {
            return res.status(400).json({ error: "Data Missing" });
        }

        await addStudentAchievement(sheets, achievement, departmentBatchId);
        return res.status(201).json({ isAchievementAdded: true });    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function viewAchievements(req, res) {

    try {

        const { student, departmentBatchId } = req;
        const achievements = await getAchievementsOfAStudent(sheets, student, departmentBatchId);
        return res.status(200).json({ achievements });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}