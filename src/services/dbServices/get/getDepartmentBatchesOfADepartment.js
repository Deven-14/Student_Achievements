import DepartmentBatch from "./../../../models/DepartmentBatch.js"

export default async function getDepartmentBatchesOfADepartment(departmentCode) {
    try {
        
        const departmentBatchesOfADepartment = await DepartmentBatch.find({departmentCode: departmentCode});
        console.log("get DepartmentBatches of A department success");
        return departmentBatchesOfADepartment;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatches of A department");
        throw error;
    }
}