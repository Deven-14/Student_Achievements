import Department from "./../../../../models/Department.js";

export default async function getDepartmentDocument(departmentCode) {
    try {
        
        const department = await Department.findOne({ code: departmentCode });
        console.log("get Department Document success");
        return department;

    } catch(error) {
        console.log(error);
        console.log("Error getting Department Document");
        throw error;
    }
}