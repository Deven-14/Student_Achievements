import get_auth from './../auth/get_auth.js';
import { get_sort_sheet_year_requests } from './get_sort_sheet_requests.js';

async function get_add_achievement_requests(achievement) {

    var data = [
        achievement.student.usn,
        achievement.student.name,
        achievement.student.email,
        achievement.nameOfEvent,
        achievement.detailsOfEvent,
        achievement.level, // "Level(state/national/international)",
        achievement.award, // "Award/Price"
    ];
    var values = [];

    for(let ele of data)
    {
        values.push({
            userEnteredValue: {
                stringValue: ele,
            }
        });
    }

    values.push({
        userEnteredValue: {
            formulaValue: `=HYPERLINK("${achievement.certificateUrl}")`,
        }
    });

    var requests = [{
        appendCells : {
            sheetId: achievement.yearOfAchievement,
            rows : [
                {
                    values : values //only one row with values = values
                }
            ],
            fields: "*"
        }
    }];

    return requests;

}


export default async function add_achievement_to_departmentBatch(sheets, achievement_sheets_admin_credentials, achievement, deparmentBatch) {

    var requests = [];
    var requests1 = await get_add_achievement_requests(achievement);
    var requests2 = await get_sort_sheet_year_requests(achievement.yearOfAchievement);
    requests.push(...requests1, ...requests2);

    const resource = {requests};

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"], achievement_sheets_admin_credentials);
    const gsheets = sheets({version: 'v4', auth: gauth});

    try {
        
        await gsheets.spreadsheets.batchUpdate({
            spreadsheetId : deparmentBatch.achievementsSpreadsheetId,
            resource
        });
        console.log("added achievement", achievement);

    } catch(error) {
        console.log(error);
        console.log("Error adding achievement", achievement);
        throw error;
    }

}