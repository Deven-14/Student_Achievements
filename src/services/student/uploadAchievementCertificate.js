import { getDepartmentBatchDocumentUsingId } from "./../dbServices/index.js";
import { upload_certificate_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function uploadAchievementCertificate(drive, filepath, student, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocumentUsingId(departmentBatchId);
    const webViewLink = await upload_certificate_to_departmentBatch(drive, filepath, student, departmentBatch);
    return webViewLink;
        
}