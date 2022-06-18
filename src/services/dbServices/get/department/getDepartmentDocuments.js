import Department from "./../../../../models/Department.js";

export default async function getDepartmentDocuments(departmentCodes) {
    try {
        
        const departments = await Department.findOne({ code: { $in: departmentCodes } });
        console.log("get Department Documents success");
        return departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting Department Documents");
        throw error;
    }
}