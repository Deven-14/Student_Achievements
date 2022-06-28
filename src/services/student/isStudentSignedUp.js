import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { is_student_in_departmentBatch } from "./../gdriveServices/index.js";


export default async function isStudentSignedUp(sheets, student) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    const isSignedUp = await is_student_in_departmentBatch(sheets, student, departmentBatch);
    return isSignedUp;
    
}