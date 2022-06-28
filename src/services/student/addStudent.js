import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { add_student_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function addStudent(sheets, student) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    await add_student_to_departmentBatch(sheets, student, departmentBatch);

}