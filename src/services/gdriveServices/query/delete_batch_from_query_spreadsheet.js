import fetch from "node-fetch";

export default async function delete_batch_from_query_spreadsheet(batchName) {
    try{

        const body = {
            token: process.env.APPS_SCRIPT_TOKEN,
            batchName,
        };

        const res = await fetch(
            `https://script.google.com/macros/s/${process.env.APPS_SCRIPT_WEB_APP_ID}/exec?action=deleteBatch`, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await res.json();
        if(response.status != 200) {
            throw new Error(response.error.message);
        } 
        console.log("deleted batch from query spreadsheet");

    } catch(error) {
        console.log(error);
        console.log("Error deleting batch from query spreadsheet");
        throw error;
    }
}