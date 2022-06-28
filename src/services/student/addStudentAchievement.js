import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { add_achievement_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function addStudentAchievement(sheets, student, achievement) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    await add_achievement_to_departmentBatch(sheets, achievement, departmentBatch);

}