import { getAllDepartmentDocuments, getAllBatchDocuments } from "./../dbServices/index.js";
import { get_achievements_of_academic_years_within_range } from "./../gdriveServices/index.js";


export default async function getAchievements(sheets, drive, batchStartYears, departmentCodes, fromYear, toYear) {

    const departmentsPromise = getAllDepartmentDocuments();
    const batchesPromise = getAllBatchDocuments();
    const [departments, batches] = await Promise.all([departmentsPromise, batchesPromise]);

    const achievements = await get_achievements_of_academic_years_within_range(sheets, batches, departments, fromYear, toYear);
    return achievements;

}