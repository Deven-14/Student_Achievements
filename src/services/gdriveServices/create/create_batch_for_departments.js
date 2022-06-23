import get_auth from "./../auth/get_auth.js";
import create_batch_for_department from "./create_batch_for_department.js";

export default async function create_batch_for_departments(sheets, drive, departments, batch) {

    var gauth = await get_auth(["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});
    gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    const promises = [];
    for(let department of departments) {
        let promise = create_batch_for_department(gsheets, gdrive, department, batch);
        promises.push(promise);
    }

    const departmentBatches = await Promise.all(promises);
    return departmentBatches;

}