import dotenv from "dotenv";
import dbConnet from "./../../src/config/database.js";
import { sheets } from "@googleapis/sheets";
import { initAddAchievementConsumer } from "./../../src/initConsumers/student/index.js";

async function addAchievementConsumer3() {
    try {

        dotenv.config(); // path should be relative to execution path (i.e., from where u are executing the file and not relative to where the file is placed)
        await dbConnet();
        await initAddAchievementConsumer(sheets, process.env.ACHIEVEMENT_SHEETS_ADMIN3_CREDENTIALS);
        console.log(`add Achievement Consumer3 initialized - ${new Date(Date.now()).toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' })}`);
    
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

addAchievementConsumer3();