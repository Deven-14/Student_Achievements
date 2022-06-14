import Department from "./../../../models/Department.js"

export default async function addbatchIdToAllDepartmentDocuments(batchId) {
    try {
        
        await Department.updateMany({}, { $addToSet: {batches: batchId} })
        console.log("added batch Id", batchId, "to all departments");

    } catch(error) {
        console.log(error);
        console.log("Error adding batch Id", batchId, "to all departments");
        throw error;
    }
}