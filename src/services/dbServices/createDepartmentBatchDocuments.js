import DepartmentBatch from "./../../models/DepartmentBatch.js"

export default async function createDepartmentBatchDocuments(departmentBatchListOfABatch) {
    try {
        
        await DepartmentBatch.create(departmentBatchListOfABatch);
        console.log("added DepartmentBatch List of a Batch", departmentBatchListOfABatch, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding DepartmentBatch List of a Batch", departmentBatchListOfABatch, "to database");
        throw error;
    }
}