import { getDepartmentBatchDocument } from "./../dbServices/index.js";
import { add_achievement_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function addAchievement(sheets, achievement, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocument(departmentBatchId);
    await add_achievement_to_departmentBatch(sheets, achievement, departmentBatch);

}