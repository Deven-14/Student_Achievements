import { getDepartmentBatchDocument } from "./../dbServices/index.js";
import { get_student_achievements_of_departmentBatch } from "./../gdriveServices/index.js";


export default async function getAchievementsOfStudent(sheets, student, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocument(departmentBatchId);
    const achievements = await get_student_achievements_of_departmentBatch(sheets, student, departmentBatch);
    return achievements;

}