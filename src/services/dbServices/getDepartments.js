import Department from "./../../models/Department.js"

export default async function getDepartments() {
    try {
        
        const departments = await Department.find();
        console.log("get Departments success");
        return departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting Departments");
        throw error;
    }
}