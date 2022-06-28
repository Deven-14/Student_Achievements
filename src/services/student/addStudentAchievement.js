import getStudentDepartmentBatch from "./getStudentDepartmentBatch.js";
import { add_achievement_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function addStudentAchievement(sheets, achievement_sheets_admin_credentials, student, achievement) {

    const departmentBatch = await getStudentDepartmentBatch(student.usn);
    await add_achievement_to_departmentBatch(sheets, achievement_sheets_admin_credentials, achievement, departmentBatch);

}