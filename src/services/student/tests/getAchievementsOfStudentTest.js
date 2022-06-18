import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import getAchievementsOfStudent from "./../getAchievementsOfStudent.js";
import getStudentDepartmentBatchId from "./../getStudentDepartmentBatchId.js";

async function getAchievementsOfStudentTest(sheets, student) {

    const departmentBatchId = await getStudentDepartmentBatchId(student);
    const achievements = await getAchievementsOfStudent(sheets, student, departmentBatchId);
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
    
    await getAchievementsOfStudentTest(sheets, student);

    console.log("done");
}

main();