import DepartmentBatch from "./../../../models/DepartmentBatch.js"

export default async function getDepartmentBatchDocuments(departmentCode) {
    try {
        
        const departmentBatches = await DepartmentBatch.find({ departmentCode: departmentCode });
        console.log("get DepartmentBatch Documents of A department success");
        return departmentBatches;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatch Documents of A department");
        throw error;
    }
}