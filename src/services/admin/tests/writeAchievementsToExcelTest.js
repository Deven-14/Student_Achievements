import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import getAchievements from "./../getAchievements.js";
import writeAchievementsToExcel from "./../writeAchievementsToExcel.js";

async function writeAchievementsToExcelTest(sheets, batchStartYears, departmentCodes, fromYear, toYear) {

    const achievements = await getAchievements(sheets, batchStartYears, departmentCodes, fromYear, toYear);
    console.log(achievements);
    await writeAchievementsToExcel(`${Date.now()}.xlsx`, achievements);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const batchStartYears = [2019];
    const departmentCodes = ["IS"];
    const fromYear = 2017;
    const toYear = 2024;
    await writeAchievementsToExcelTest(sheets, batchStartYears, departmentCodes, fromYear, toYear);

    console.log("done");
}

main();