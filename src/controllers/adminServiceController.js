import fs from "fs";
import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import { getAchievements, writeAchievementsToExcel, createBatch, createDepartment } from "./../services/index.js";


export async function studentAchievements(req, res) {

    try {

        // check if batchStartYears and departmentCodes are array when only one is selected
        const { batchStartYears, departmentCodes, fromYear, toYear } = req.body;
        const achievemnts = await getAchievements(sheets, batchStartYears, departmentCodes, fromYear, toYear);
        return res.status(200).json({ achievemnts });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function downloadAchievements(req, res) {

    try {

        // check if batchStartYears and departmentCodes are array when only one is selected
        const { batchStartYears, departmentCodes, fromYear, toYear } = req.body;
        const achievemnts = await getAchievements(sheets, batchStartYears, departmentCodes, fromYear, toYear);
        
        const dateNow = Date.now();
        const filepath = `./temp/${dateNow}.xlsx`;

        await writeAchievementsToExcel(filepath, achievemnts);
        return res.status(200).download(filepath, `student_achievements_${dateNow}.xlsx`, (err) => {
            if (err) {
                console.log("file download error");
            } else {
                //console.log("downloaded");
                fs.unlink(filepath, (err) => {
                    //console.log("file deleted");
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

        // router.use(isAdminValidation); not required coz we can keep different access_token_secrect for student and admin
        // already batch exists validation  return res.status(401).json({ error: "Invalid Batch" }); // for validation
        const { startYear } = req.body;
        await createBatch(sheets, drive, startYear);
        return res.status(201).json({ success: "Batch Created Successfully" });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function addDepartment(req, res) {

    try {

        // already department exists validation  return res.status(401).json({ error: "Invalid Batch" }); // for validation
        const { name, code } = req.body;
        await createDepartment(sheets, drive, name, code);
        return res.status(201).json({ success: "Department Created Successfully" });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}