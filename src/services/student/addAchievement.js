import { getDepartmentBatchDocumentUsingId } from "./../dbServices/index.js";
import { add_achievement_to_departmentBatch } from "./../gdriveServices/index.js";


export default async function addAchievement(sheets, achievement, departmentBatchId) {

    const departmentBatch = await getDepartmentBatchDocumentUsingId(departmentBatchId);
    await add_achievement_to_departmentBatch(sheets, achievement, departmentBatch);

}