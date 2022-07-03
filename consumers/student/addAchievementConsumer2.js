import 'dotenv/config';
import dbConnet from "./../../src/config/database.js";
import { sheets } from "@googleapis/sheets";
import { initAddAchievementConsumer } from "./../../src/initConsumers/student/index.js";

async function addAchievementConsumer2() {
    try {

        await dbConnet();
        await initAddAchievementConsumer(sheets, process.env.ACHIEVEMENT_SHEETS_ADMIN2_CREDENTIALS);
        console.log(`add Achievement Consumer2 initialized - ${new Date(Date.now()).toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' })}`);
    
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

addAchievementConsumer2();