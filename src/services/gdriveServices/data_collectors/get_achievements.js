import Achievement from "../../models/Achievement.js";

export async function get_achievements(sheets, student, spreadsheetId) {
    
    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    var ranges = [];
    for(let i = 1; i <= 4; ++i) {
        ranges.push(`year${i}!A2:H`);
    }

    try {

        const res = await gsheets.spreadsheets.values.batchGet({
            spreadsheetId,
            ranges,
        });

        var achievements = [];
        for(let i = 0; i < 4; ++i) {
            var rows = res.data.valueRanges[i].values;
            if(rows) {
                for(let row of rows) {
                    var achievement = new Achievement(i+1, row);
                    if(achievement.email.localeCompare(student.email) == 0) {
                        achievements.push(achievement);
                    }
                }
            }
        }

        return achievements;

    } catch(error) {
        console.log(error);
        console.log("Error getting achievements for", email);
        throw error;
    }
    
}