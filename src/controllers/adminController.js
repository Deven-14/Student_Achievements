import fs from "fs";
import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import { 
    getAchievements, writeAchievementsToExcel, 
    createBatch, createDepartment, 
    getBatchesToBeCreated 
} from "./../services/admin/index.js";


export async function studentAchievements(req, res) {

    try {

        const { batchStartYears, departmentCodes, fromYear, toYear } = req;
        const achievemnts = await getAchievements(sheets, batchStartYears, departmentCodes, fromYear, toYear);
        return res.status(200).json({ achievemnts });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function downloadAchievements(req, res) {

    try {

        const { batchStartYears, departmentCodes, fromYear, toYear } = req;
        const achievemnts = await getAchievements(sheets, batchStartYears, departmentCodes, fromYear, toYear);
        
        const dateNow = Date.now();
        const filepath = `./temp/${dateNow}.xlsx`;

        await writeAchievementsToExcel(filepath, achievemnts);
        return res.status(200).download(filepath, `student_achievements_${dateNow}.xlsx`, (err) => {
            if (err) {
                console.log("dowload achievements temp file error", filepath);
            } else {
                console.log("file downloaded", filepath);
                fs.unlink(filepath, (error) => {
                    if (error) {
                        console.log("failed to unlink dowloaded achievements temp file", filepath);
                    } else {
                        console.log("dowloaded achievements temp file deleted", filepath);
                    }
                });
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function addBatch(req, res) {

    try {

        const { batchStartYear } = req.body;
        await createBatch(sheets, drive, batchStartYear);
        return res.status(201).json({ success: "Batch Created Successfully" });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function addDepartment(req, res) {

    try {

        const { name, code } = req.body;
        await createDepartment(sheets, drive, name, code);
        return res.status(201).json({ success: "Department Created Successfully" });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export async function batchesToBeCreated(req, res) {

    try {

        const batches = await getBatchesToBeCreated();
        return res.status(200).json({ batches });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}