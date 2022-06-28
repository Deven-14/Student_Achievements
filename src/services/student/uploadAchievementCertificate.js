import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { upload_certificate_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function uploadAchievementCertificate(drive, filepath, student) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    const webViewLink = await upload_certificate_to_departmentBatch(drive, filepath, student, departmentBatch);
    return webViewLink;
        
}