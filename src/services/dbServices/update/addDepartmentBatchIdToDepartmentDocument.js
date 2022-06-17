import Department from "./../../../models/Department.js";

export default async function addDepartmentBatchIdToDepartmentDocument(departmentBatchId, departmentCode) {
    try {
        
        await Department.findOneAndUpdate({ code: departmentCode }, { $addToSet: { batches: departmentBatchId } })
        console.log("added departmentBatchId", departmentBatchId, "to department", departmentCode);

    } catch(error) {
        console.log(error);
        console.log("Error adding departmentBatchId", departmentBatchId, "to department", departmentCode);
        throw error;
    }
}