import Department from "./../../models/Department.js";

export default async function getAllDepartmentDocuments() {
    try {
        
        const departments = await Department.find();
        console.log("get All Department Documents success");
        return departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting All Department Documents");
        throw error;
    }
}