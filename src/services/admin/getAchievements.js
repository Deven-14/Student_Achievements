import { getDepartmentDocuments, getBatchDocuments } from "./../dbServices/index.js";
import { get_achievements_of_academic_years_within_range } from "./../gdriveServices/index.js";


export default async function getAchievements(sheets, batchStartYears, departmentCodes, fromYear, toYear) {

    const batches = await getBatchDocuments(batchStartYears);
    const achievements = await get_achievements_of_academic_years_within_range(sheets, batches, departmentCodes, fromYear, toYear);
    return achievements;

}