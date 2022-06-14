import DepartmentBatch from "./../../../models/DepartmentBatch.js"

export default async function getDepartmentBatches() {
    try {
        
        const DepartmentBatches = await DepartmentBatch.find();
        console.log("get DepartmentBatches success");
        return DepartmentBatches;

    } catch(error) {
        console.log(error);
        console.log("Error getting DepartmentBatches");
        throw error;
    }
}