import Department from "./../../../models/Department.js"

export default async function addbatchIdsToDepartmentDocument(batchIds, departmentCode) {
    try {
        
        await Department.findOneAndUpdate({ code: departmentCode }, { $addToSet: { batches: { $each: batchIds } } })
        console.log("added batch Ids", batchIds, "to department", departmentCode);

    } catch(error) {
        console.log(error);
        console.log("Error adding batch Ids", batchIds, "to department", departmentCode);
        throw error;
    }
}