import DepartmentBatch from "./../../models/DepartmentBatch.js";

export default async function getDepartmentBatchDocumentsOfADepartment(departmentCode) {
    try {
        
        // other department batch functions are not populated ***************
        const departmentBatchesOfADepartment = await DepartmentBatch.find({ departmentCode: departmentCode }).populate("batch");
        console.log("get DepartmentBatch Documents of A department success");
        return departmentBatchesOfADepartment;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatch Documents of A department");
        throw error;
    }
}