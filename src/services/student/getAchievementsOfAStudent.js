import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { get_student_achievements_of_departmentBatch } from "./../gdriveServices/index.js";


export default async function getAchievementsOfAStudent(sheets, student) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    const achievements = await get_student_achievements_of_departmentBatch(sheets, student, departmentBatch);
    return achievements;

}