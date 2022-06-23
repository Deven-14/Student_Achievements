import fetch from "node-fetch";

export default async function add_department_to_query_spreadsheet(departmentCode, departmentBatchesOfADepartment) {
    try{

        const body = {
            token: process.env.APPS_SCRIPT_TOKEN,
            departmentCode,
            departmentBatchesOfADepartment
        };

        const res = await fetch(
            `https://script.google.com/macros/s/${process.env.APPS_SCRIPT_WEB_APP_ID}/exec?action=addDepartment`, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await res.json();
        if(response.status != 200) {
            throw new Error(response.error.message);
        } 
        console.log("added department to query spreadsheet");

    } catch(error) {
        console.log(error);
        console.log("Error adding department to query spreadsheet");
        throw error;
    }
}