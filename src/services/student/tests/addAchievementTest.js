import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student, Achievement } from "./../../../interfaces/index.js";
import addAchievement from "./../addAchievement.js";
import getStudentDepartmentBatchId from "./../getStudentDepartmentBatchId.js";

async function addAchievementTest(sheets, student, achievement) {

    const departmentBatchId = await getStudentDepartmentBatchId(student);
    await addAchievement(sheets, achievement, departmentBatchId);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const student = new Student({
        usn: "1BM19IS048",
        name: "Deven Prakash Paramaj",
        email: "devenparamaj.is19@bmsce.ac.in",
        phone: "1234567890" // imp phone is text
    });
    
    const achievementDetails = {
        nameOfEvent: "abc",
        detailsOfEvent: "def",
        level: "national",
        award: "yes",
        certificateUrl: "www.google.com", // certificateUrl is be automatically undefined if it is not there in the object
        yearOfAchievement: 3
    };

    const achievement = new Achievement(student, achievementDetails);
    // console.log(achievement);
    
    await addAchievementTest(sheets, student, achievement);

    console.log("done");
}

main();