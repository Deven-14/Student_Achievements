import Department from "./../../../models/Department.js"

export default async function getDepartmentNameAndCodes() {
    try {
        
        const departments = await Department.find({}, {name: 1, code: 1, _id: 0});
        console.log("get Department Name And Codes success");
        return departments;

    } catch(error) {
        console.log(error);
        console.log("Error getting Department Name And Codes");
        throw error;
    }
}