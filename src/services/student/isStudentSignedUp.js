import { getDepartmentBatchDocument } from "./../dbServices/index.js";
import { is_student_in_departmentBatch } from "./../gdriveServices/index.js";


export default async function isStudentSignedUp(sheets, student, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocument(departmentBatchId);
    const isSignedUp = await is_student_in_departmentBatch(sheets, student, departmentBatch);
    return isSignedUp;
    
}