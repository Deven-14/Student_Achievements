import { getAllDepartmentDocumentsWithNameAndCode } from "./../../repositories/index.js";

export default async function getDepartments() {
    try {
        
        const departments = await getAllDepartmentDocumentsWithNameAndCode();
        return departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting Batches to be created");
        throw error;
    }
}