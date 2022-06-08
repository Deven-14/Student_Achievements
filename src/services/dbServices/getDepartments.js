import Department from "./../../models/Department.js"

export default async function getDepartments() {
    try {
        
        const Departments = await Department.find();
        console.log("get Departments success");
        return Departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting Departments");
        throw error;
    }
}