import { getDepartmentDocument } from "./../dbServices/index.js";
import { STUDENT_ACHIEVEMENTS_BATCH_START_YEAR } from "./../../config/constants.js";

export async function isPhoneNumberValid(phoneNumber) {
        
    return phoneNumber.match(/^\d{10}$/) ? true : false;

}

export async function isUSNValid(usn) {

    if(!usn.match(/^1BM\d{2}[A-Z]{2}\d{3}$/)) {
        return false;
    }

    const batchStartYear = parseInt("20" + usn.slice(3, 5));
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if(batchStartYear < STUDENT_ACHIEVEMENTS_BATCH_START_YEAR 
        || batchStartYear > currentYear 
        || (batchStartYear == currentYear && currentMonth < 7)) { // 7 here is august, coz month is in index form 0 - 11
        return false;
    }

    const departmentCode = usn.slice(5, 7);
    const department = await getDepartmentDocument(departmentCode);
    if(!department) {
        return false;
    }

    return true;
}