import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import isStudentSignedUp from "./../isStudentSignedUp.js";
import getStudentDepartmentBatchId from "./../getStudentDepartmentBatchId.js";

async function isStudentSignedUpTest(sheets, student) {

    const departmentBatchId = await getStudentDepartmentBatchId(student.usn);
    const isSignedUp = await isStudentSignedUp(sheets, student, departmentBatchId);
    console.log(isSignedUp);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const studentPass = new Student({
        usn: "1BM19IS048",
        name: "Deven Prakash Paramaj",
        email: "devenparamaj.is19@bmsce.ac.in",
        phone: "1234567890" // imp phone is text
    });
    
    const studentFail = new Student({
        usn: "1BM19IS048",
        name: "Deven Prakash Paramaj",
        email: "devenparamaj123.is19@bmsce.ac.in",
        phone: "1234567890" // imp phone is text
    });

    await isStudentSignedUpTest(sheets, studentPass);
    await isStudentSignedUpTest(sheets, studentFail);

    console.log("done");
}

main();