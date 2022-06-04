import Department from "./../../models/Department.js"

export async function createDepartmentDocument(name, code, folderId) {
    try {
        
        await Department.create({name: name, code: code, folderId: folderId});
        console.log("added department", name, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding department", name, "to database");
        throw error;
    }
}