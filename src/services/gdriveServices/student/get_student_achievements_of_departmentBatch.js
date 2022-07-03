import Achievement from "./../../../interfaces/Achievement.js";
import get_auth from "./../auth/get_auth.js";

export default async function get_student_achievements_of_departmentBatch(sheets, student, departmentBatch) {
    
    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    var ranges = [];
    for(let i = 1; i <= 4; ++i) {
        ranges.push(`year${i}!A2:H`);
    }

    try {

        const res = await gsheets.spreadsheets.values.batchGet({
            spreadsheetId: departmentBatch.achievementsSpreadsheetId,
            ranges,
        });

        var achievements = [];
        for(let i = 0; i < 4; ++i) {
            var rows = res.data.valueRanges[i].values;
            if(rows) {
                for(let row of rows) {
                    if(row[2] == student.email) {
                        const achievement = Achievement.makeForStudent(row, i+1);
                        achievements.push(achievement);
                    }
                }
            }
        }

        return achievements;

    } catch(error) {
        console.log(error);
        console.log("Error getting achievements for", student.email);
        throw error;
    }
    
}