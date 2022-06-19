import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import addStudent from "./../addStudent.js";
import getStudentDepartmentBatchId from "./../getStudentDepartmentBatchId.js";

async function addStudentTest(sheets, student) {

    const departmentBatchId = await getStudentDepartmentBatchId(student.usn);
    await addStudent(sheets, student, departmentBatchId);
    
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
    
    await addStudentTest(sheets, student);

    console.log("done");
}

main();