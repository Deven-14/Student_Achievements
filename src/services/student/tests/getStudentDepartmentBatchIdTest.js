import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import getAchievementsOfStudent from "./../getAchievementsOfStudent.js";

async function getAchievementsOfStudentTest(sheets, student, departmentBatchId) {

    const departmentBatchId = await getAchievementsOfStudent(sheets, student, departmentBatchId);
    console.log(departmentBatchId);

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
    await getAchievementsOfStudentTest(student);

    console.log("done");
}

main();