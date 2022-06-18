import { getBatchDocument, getDepartmentBatchDocument } from "./../dbServices/index.js";

export default async function getStudentDepartmentBatchId(student) {
    
    const usn = student.usn;
    const batchStartYear = parseInt("20" + usn.slice(3, 5));
    const batch = await getBatchDocument(batchStartYear);
    const departmentCode = usn.slice(5, 7);
    const departmentBatch = await getDepartmentBatchDocument(departmentCode, batch._id);
    return departmentBatch._id;

}