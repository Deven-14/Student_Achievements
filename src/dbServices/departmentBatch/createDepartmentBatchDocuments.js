import DepartmentBatch from "./../../models/DepartmentBatch.js";
import Department from "./../../models/Department.js";

export default async function createDepartmentBatchDocuments(departmentBatches) {
    try {
        
        await DepartmentBatch.create(departmentBatches);
        
        departmentBatches = await DepartmentBatch.find();

        const departmentBatchPromises = [];
        for(let departmentBatch of departmentBatches) {
            let departmentBatchPromise =  Department.findOneAndUpdate({ code: departmentBatch.departmentCode }, { $addToSet: { batches: departmentBatch._id }})
            departmentBatchPromises.push(departmentBatchPromise);
        }

        await Promise.all(departmentBatchPromises);
        console.log("added departmentBatches", departmentBatches, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding departmentBatches", departmentBatches, "to database");
        throw error;
    }
}