import Department from "./../../../models/Department.js"

export default async function addbatchIdToDepartmentDocument(batchId, departmentCode) {
    try {
        
        await Department.findOneAndUpdate({code: departmentCode}, { $addToSet: {batches: batchId} })
        console.log("added batch Id", batchId, "to department", departmentCode);

    } catch(error) {
        console.log(error);
        console.log("Error adding batch Id", batchId, "to department", departmentCode);
        throw error;
    }
}