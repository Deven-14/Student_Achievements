import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import getAchievementsOfAStudent from "./../getAchievementsOfAStudent.js";

async function getAchievementsOfAStudentTest(sheets, student) {

    const achievements = await getAchievementsOfAStudent(sheets, student);
    console.log(achievements);
    
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
    
    await getAchievementsOfAStudentTest(sheets, student);

    console.log("done");
}

main();