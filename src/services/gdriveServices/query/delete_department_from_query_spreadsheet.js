import fetch from "node-fetch";

export default async function delete_department_from_query_spreadsheet(departmentCode, DepartmentBatchesOfADepartment) {
    try{

        const body = {
            token: process.env.APPS_SCRIPT_TOKEN,
            departmentCode,
            DepartmentBatchesOfADepartment
        };

        const res = await fetch(
            `https://script.google.com/macros/s/${process.env.APPS_SCRIPT_WEB_APP_ID}/exec?action=deleteDepartment`, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await res.json();
        if(response.status != 200) {
            throw new Error(response.error.message);
        } 
        console.log("deleted department from query spreadsheet");

    } catch(error) {
        console.log(error);
        console.log("Error deleting department from query spreadsheet");
        throw error;
    }
}