import { getDepartmentBatchDocumentUsingId } from "./../dbServices/index.js";
import { add_student_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function addStudent(sheets, student, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocumentUsingId(departmentBatchId);
    await add_student_to_departmentBatch(sheets, student, departmentBatch);

}