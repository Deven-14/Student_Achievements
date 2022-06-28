import DepartmentBatch from "./../../../../models/DepartmentBatch.js"

export default async function getDepartmentBatchDocumentUsingId(departmentBatchId) {
    try {
        
        const departmentBatch = await DepartmentBatch.findOne({ _id: departmentBatchId });
        console.log("get DepartmentBatch Document Using Id success");
        return departmentBatch;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatch Using Id Document");
        throw error;
    }
}