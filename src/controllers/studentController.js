import fs from "fs";
import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import { addFileToTempFolder } from "./../helpers/index.js";
import { getAchievementsOfAStudent, uploadAchievementCertificate } from "./../services/student/index.js";
import { addAchievementProducer } from "./../producers/student/index.js";


export async function uploadCertificate(req, res) {
    try {

        const { student } = req;

        const file = req.files.certificate;
        const filename = `${Date.now()}.pdf`;
        const filepath = await addFileToTempFolder(file, filename);
        const certificateUrl = await uploadAchievementCertificate(drive, filepath, student);
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

        const { student, achievement } = req;
        await addAchievementProducer(student, achievement);
        return res.status(201).json({ isAchievementAdded: true });    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function viewAchievements(req, res) {

    try {

        const { student } = req;
        const achievements = await getAchievementsOfAStudent(sheets, student);
        return res.status(200).json({ achievements });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}