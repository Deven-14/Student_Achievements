import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import { Student } from "./../../../interfaces/index.js";
import getStudentDepartmentBatch from "./../getStudentDepartmentBatch.js";

async function getStudentDepartmentBatchTest(student) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    console.log(departmentBatch);

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
    await getStudentDepartmentBatchTest(student);

    console.log("done");
}

main();