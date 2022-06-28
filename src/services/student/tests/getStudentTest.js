import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import getStudent from "./../getStudent.js";

async function getStudentTest(sheets, usn, email) {

    const student = await getStudent(sheets, usn, email);
    console.log(student);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const usn = "1BM19IS050";
    const email = "devenparamaj.is19@bmsce.ac.in";
    
    await getStudentTest(sheets, usn, email);

    console.log("done");
}

main();