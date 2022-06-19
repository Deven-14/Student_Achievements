import fs from "fs";
import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import { addFileToTempFolder } from "./../helpers/addFileToTempFolder.js";
import { addStudentAchievement, getAchievementsOfAStudent, uploadAchievementCertificate } from "./../services/index.js";


export async function uploadCertificate(req, res) {
    try {

        const { student, departmentBatchId } = req;

        const file = req.files.certificate;
        const filename = `${Date.now()}.pdf`;
        const filepath = await addFileToTempFolder(file, filename);
        const certificateUrl = await uploadAchievementCertificate(drive, filepath, student, departmentBatchId);
        fs.unlink(filepath, (error) => {
            if(error) {
                console.log("Failed to unlink temp certificate file", filepath); // not throwing error;
            } else {
                console.log("uploaded certificate temp file deleted", filepath);
            }
        });

        return res.status(201).json({ certificateUrl });
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function addAchievement(req, res) {

    try {

        const { departmentBatchId } = req;
        const achievement = req.achievement;
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