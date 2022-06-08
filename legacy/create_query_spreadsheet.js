import get_auth from "../src/services/gdriveServices/auth/get_auth.js";
import create_spreadsheet from "../src/services/gdriveServices/create/create_spreadsheet.js";

export default async function create_query_spreadsheet(drive, studentAchievementsFolderId=process.env.STUDENT_ACHIEVEMENTS_FOLDER_ID) {

    const gauth = await get_auth(["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const spreadsheetId = await create_spreadsheet(
            gdrive, 
            studentAchievementsFolderId,
            "query"
        );
        console.log("add the query spreadsheetId", spreadsheetId, "to the .env file to QUERY_SPREADSHEET_ID");
        return spreadsheetId;

    } catch(error) {
        console.log(error);
        console.log("Error creating the query spreadsheetId", spreadsheetId);
        throw error;
    }

}