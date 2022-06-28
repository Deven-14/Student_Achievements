import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import addStudent from "./../addStudent.js";

async function addStudentTest(sheets, student) {

    await addStudent(sheets, student);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const student = new Student({
        usn: "1BM19IS050",
        name: "Deven Prakash Paramaj",
        email: "devenparamaj.is19@bmsce.ac.in",
        phone: "1234567890" // imp phone is text
    });
    
    await addStudentTest(sheets, student);

    console.log("done");
}

main();