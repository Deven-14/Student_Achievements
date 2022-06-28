import { Student } from "./../../interfaces/index.js";
import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { get_student_from_departmentBatch } from "./../gdriveServices/index.js";


export default async function getStudent(sheets, usn, email) {

    const departmentBatch = await getStudentDepartmentBatch(usn);
    const studentInfo = await get_student_from_departmentBatch(sheets, usn, email, departmentBatch);
    if(studentInfo) {
        return new Student(studentInfo);
    } else {
        return null;
    }
    
}