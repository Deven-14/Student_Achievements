import dotenv from "dotenv";
import dbConnet from "./../../src/config/database.js";
import { sheets } from "@googleapis/sheets";
import { initAddAchievementConsumer } from "./../../src/initConsumers/student/index.js";

async function addAchievementConsumer1() {
    try {

        dotenv.config();
        await dbConnet();
        await initAddAchievementConsumer(sheets, process.env.ACHIEVEMENT_SHEETS_ADMIN1_CREDENTIALS);
        console.log(`add Achievement Consumer1 initialized - ${new Date(Date.now()).toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' })}`);
    
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

addAchievementConsumer1();