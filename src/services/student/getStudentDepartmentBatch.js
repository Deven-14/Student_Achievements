import { getBatchDocument, getDepartmentBatchDocument } from "./../../repositories/index.js";

export default async function getStudentDepartmentBatch(usn) {
    
    const batchStartYear = parseInt("20" + usn.slice(3, 5));
    const batch = await getBatchDocument(batchStartYear);
    const departmentCode = usn.slice(5, 7);
    const departmentBatch = await getDepartmentBatchDocument(departmentCode, batch._id);
    return departmentBatch;

}