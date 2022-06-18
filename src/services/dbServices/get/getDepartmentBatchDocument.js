import DepartmentBatch from "./../../../models/DepartmentBatch.js"

export default async function getDepartmentBatchDocument(departmentBatchId) {
    try {
        
        const departmentBatch = await DepartmentBatch.find({ _id: departmentBatchId });
        console.log("get DepartmentBatch Document success");
        return departmentBatch;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatch Document");
        throw error;
    }
}