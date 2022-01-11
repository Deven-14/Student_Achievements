const {google} = require('googleapis');
const Achievement = require("../../models/Achievement");

function get_achievements(auth, userData) {
    
    return new Promise(async (resolve, reject) => {

        const sheets = google.sheets({version: 'v4', auth});
        const spreadsheetId = userData.spreadsheetId;

        var ranges = [];
        for(let i = 1; i <= 4; ++i) {
            ranges.push(`year${i}!A2:H`);
        }

        sheets.spreadsheets.values.batchGet({
            spreadsheetId,
            ranges,
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                
                var achievements = [];
                for(let i = 0; i < 4; ++i) {
                    var rows = result.data.valueRanges[i].values;
                    if(rows){
                        for(let row of rows) {
                            var achievement = Achievement(i+1, row);
                            if(achievement.email.localeCompare(userData.email) == 0) {
                                achievements.push(achievement);
                            }
                        }
                    }
                }

                resolve(achievements);
            }
        });
        
    });

}

module.exports = get_achievements;