import get_auth from "./../auth/get_auth.js";

export default async function is_student_in_batch(sheets, student, batchSpreadsheetId) {

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    const range = "Sheet1!A:H";

    try {

        const res = await gsheets.spreadsheets.values.get({
            spreadsheetId: batchSpreadsheetId,
            range,
        });

        const rows = res.data.values;
        if(rows) {
            for(let row of rows) {
                if(row[2] == student.email) {
                    return true;
                }
            }
        }

        return false;

    } catch(error) {
        console.log(error);
        console.log("Error checking if student", student, "is in batch", batchSpreadsheetId);
        throw error;
    }
    
}