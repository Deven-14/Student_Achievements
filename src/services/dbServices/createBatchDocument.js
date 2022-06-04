import Batch from "./../../models/Batch.js"

export async function createBatchDocument(departmentCode, fromYear, toYear, folderId, spreadsheetId, certificatesFolderId) {
    try {
        
        await Batch.create({departmentCode, fromYear, toYear, folderId, spreadsheetId, certificatesFolderId});
        console.log("added batch", `batch-${fromYear}-${toYear}`, departmentCode, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding batch", `batch-${fromYear}-${toYear}`, departmentCode, "to database");
        throw error;
    }
}