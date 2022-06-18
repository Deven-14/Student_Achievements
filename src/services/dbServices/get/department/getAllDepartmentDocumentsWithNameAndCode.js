import Department from "./../../../../models/Department.js";

export default async function getAllDepartmentDocumentsWithNameAndCode() {
    try {
        
        const departments = await Department.find({}, {name: 1, code: 1, _id: 0});
        console.log("get All Department Documents with Name And Code success");
        return departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting All Department Documents with Name And Code");
        throw error;
    }
}