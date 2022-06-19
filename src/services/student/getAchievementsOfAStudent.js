import { getDepartmentBatchDocumentUsingId } from "./../dbServices/index.js";
import { get_student_achievements_of_departmentBatch } from "./../gdriveServices/index.js";


export default async function getAchievementsOfAStudent(sheets, student, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocumentUsingId(departmentBatchId);
    const achievements = await get_student_achievements_of_departmentBatch(sheets, student, departmentBatch);
    return achievements;

}