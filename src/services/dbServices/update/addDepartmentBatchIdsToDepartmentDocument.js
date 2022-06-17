import Department from "./../../../models/Department.js"

export default async function addDepartmentBatchIdsToDepartmentDocument(departmentBatchIds, departmentCode) {
    try {
        
        await Department.findOneAndUpdate({ code: departmentCode }, { $addToSet: { batches: { $each: departmentBatchIds } } })
        console.log("added departmentBatchIds", departmentBatchIds, "to department", departmentCode);

    } catch(error) {
        console.log(error);
        console.log("Error adding departmentBatchIds", departmentBatchIds, "to department", departmentCode);
        throw error;
    }
}