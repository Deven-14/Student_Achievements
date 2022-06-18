import DepartmentBatch from "./../../../../models/DepartmentBatch.js"

export default async function getAllDepartmentBatchDocuments() {
    try {
        
        const DepartmentBatches = await DepartmentBatch.find();
        console.log("get All DepartmentBatch Documents success");
        return DepartmentBatches;

    } catch(error) {
        console.log(error);
        console.log("Error getting All DepartmentBatch Documents");
        throw error;
    }
}