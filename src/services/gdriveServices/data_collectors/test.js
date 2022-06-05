import { sheets } from "@googleapis/sheets"
import add_achievement_to_batch from "./add_achievement_to_batch.js";
import add_student_to_batch from "./add_student_to_batch.js";
import Student from "./../../../interfaces/Student.js";
import Achievement from "./../../../interfaces/Achievement.js";
import get_student_achievements_of_batch from "./get_student_achievements_of_batch.js";


async function add_student_to_batch_test(user, batchSpreadsheetId) {
    const student = new Student(user);
    await add_student_to_batch(sheets, student, batchSpreadsheetId);
}

async function add_achievement_to_batch_test(user, achievementDetails, batchSpreadsheetId) {
    const achievement = new Achievement(user, achievementDetails);
    await add_achievement_to_batch(sheets, achievement, batchSpreadsheetId);
}

async function get_student_achievements_of_batch_test(user, batchSpreadsheetId) {
    const student = new Student(user);
    const achievements = await get_student_achievements_of_batch(sheets, student, batchSpreadsheetId);
    console.log(achievements);
}

async function main() {

    const user = {
        name : "deven",
        email : "devenparamaj.is19@bmsce.ac.in",
        usn : "1BM19IS048",
        phone : "1234567890"
    };

    const achievementDetails = {
        nameOfEvent : "ABC",
        detailsOfEvent : "DEF",
        level : "state",
        award : "yes",
        certificateUrl : "https://google.com",
        yearOfAchievement : 1
    };

    const batchSpreadsheetId = "1Amb85cwTkzIrmCcqNK7uAXGw5G2cG5c2z8w2eVphO4Q";

    // await add_student_to_batch_test(user);
    // await add_achievement_to_batch_test(user, achievementDetails);
    // await get_student_achievements_of_batch_test(user, batchSpreadsheetId);
}

main();