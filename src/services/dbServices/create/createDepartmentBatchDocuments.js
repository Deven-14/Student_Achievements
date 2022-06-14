import DepartmentBatch from "./../../../models/DepartmentBatch.js"

export default async function createDepartmentBatchDocuments(DepartmentBatches) {
    try {
        
        await DepartmentBatch.create(DepartmentBatches);
        console.log("added DepartmentBatches", DepartmentBatches, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding DepartmentBatches", DepartmentBatches, "to database");
        throw error;
    }
}