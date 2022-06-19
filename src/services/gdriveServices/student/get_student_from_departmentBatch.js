import get_auth from "./../auth/get_auth.js";

export default async function get_student_from_departmentBatch(sheets, usn, email, departmentBatch) {

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    const range = "Sheet1!A:D";

    try {

        const res = await gsheets.spreadsheets.values.get({
            spreadsheetId: departmentBatch.achievementsSpreadsheetId,
            range,
        });

        const rows = res.data.values;
        if(rows) {
            for(let row of rows) {
                if(row[0] == usn && row[2] == email) {
                    return {
                        usn: row[0],
                        name: row[1],
                        email: row[2],
                        phone: row[3]
                    };
                }
            }
        }

        return null;

    } catch(error) {
        console.log(error);
        console.log("Error getting student", usn, email, "from Department Batch", departmentBatch.achievementsSpreadsheetId);
        throw error;
    }
    
}