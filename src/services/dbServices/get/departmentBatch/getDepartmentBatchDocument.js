import DepartmentBatch from "./../../../../models/DepartmentBatch.js"

export default async function getDepartmentBatchDocument(departmentCode, batchId) {
    try {
        
        const departmentBatch = await DepartmentBatch.findOne({ departmentCode: departmentCode, batch: batchId });
        console.log("get DepartmentBatch Document success");
        return departmentBatch;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatch Document");
        throw error;
    }
}