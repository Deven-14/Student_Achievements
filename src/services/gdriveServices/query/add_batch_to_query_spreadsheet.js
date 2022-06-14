import fetch from "node-fetch";

export default async function add_batch_to_query_spreadsheet(batchName, departmentBatchList) {
    try{

        const body = {
            token: process.env.APPS_SCRIPT_TOKEN,
            batchName,
            departmentBatchList
        };

        const res = await fetch(
            `https://script.google.com/macros/s/${process.env.APPS_SCRIPT_WEB_APP_ID}/exec?action=addBatch`, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await res.json();
        if(response.status != 200) {
            throw new Error(response.error.message);
        } 
        console.log("added batch to query spreadsheet");

    } catch(error) {
        console.log(error);
        console.log("Error adding batch to query spreadsheet");
        throw error;
    }
}