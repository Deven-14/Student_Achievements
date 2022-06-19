import { getDepartmentDocument } from "./../dbServices/index.js";

export default async function isDepartmentCreated(departmentCode) {

    const department = await getDepartmentDocument(departmentCode);
    if(!department) {
        return false;
    }
    return true;

}