import get_auth from "./../auth/get_auth.js";

async function get_batches_within_academic_year(batches, start_academic_year, end_academic_year) {

    var new_batches = [];
    for(let batch of batches)
    {
        var begin = batch.fromYear;
        var end = batch.toYear;
        if(start_academic_year < end && end_academic_year > begin) {
            new_batches.push(batch);
        }
    }

    return new_batches;

}

async function get_achievements_of_years_of_batch(gsheets, years, batchSpreadsheetId)
{
    var ranges = [];
    for(let year of years)
        ranges.push(`${year}!A2:H`);

    try {

        const res = await gsheets.spreadsheets.values.batchGet({
            spreadsheetId: batchSpreadsheetId,
            ranges,
        });

        var data = {};
        for(let i in years) {
            data[years[i]] = res.data.valueRanges[i].values;
        }
        
        return data;

    } catch(error) {
        console.log(error);
        console.log("Cannot get batch data", batchSpreadsheetId);
        throw error;
    }
}

// function get_batch_ids_of_department(sheets, spreadsheetId, departments, batches) {

//     return new Promise((resolve, reject) => {
        
//         var department_batch_ids = {};
//         batches = new Set(batches);

//         var ranges = [];
//         for(let department of departments)
//             ranges.push(`${department}!A:B`);

//         sheets.spreadsheets.values.batchGet({
//             spreadsheetId,
//             ranges,
//         }, (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
                
//                 var files = result.data.valueRanges;
//                 for(let i in departments)
//                 {
//                     var values = files[i].values;
//                     department_batch_ids[departments[i]] = {};
//                     var department_batches = {};
//                     for(let value of values)
//                         department_batches[value[0]] = value[1];
//                     for(let batch of batches)
//                         department_batch_ids[departments[i]][batch] = department_batches[batch];
//                 }
//                 //console.log(department_batch_ids);
//                 resolve(department_batch_ids);
//             }
//         });
//     });
// }

async function get_department_batches(departments, batches) {

    const department_batches = {};

    for(let department of departments) {
        department_batches[department.code] = [];
    }

    for(let batch of batches) {
        department_batches[batch.departmentCode].push(batch);
    }

    return department_batches;

}

async function get_all_batches_data(gsheets, batches, start_academic_year, end_academic_year) {

    var batchAchievements = {};
    var promises = [];

    for(let batch of batches) {

        var begin = batch.fromYear;
        var years = [];
        for(let i = 0; i < 4; ++i) {
            if(begin + i >= start_academic_year && begin + i < end_academic_year) {
                years.push(`year${i+1}`);
            }
        }
        
        var promise = get_achievements_of_years_of_batch(gsheets, years, batch.spreadsheetId);
        promises.push(promise);

    }
    
    var batchAchievementsArray = await Promise.all(promises);
    var i = 0;
    for(let batch of batches) {
        batchAchievements[`batch-${batch.fromYear}-${batch.toYear}`] = batchAchievementsArray[i++];
    }

    return batchAchievements;
}

function get_data_in_format(data, start_academic_year, end_academic_year)
{
    return new Promise((resolve, reject) => {

        var new_data = {};
        
        for(let i = start_academic_year; i < end_academic_year; ++i)
            new_data[`${i}-${i+1}`] = [];
        
        for(let i = start_academic_year; i < end_academic_year; ++i)
        {
            for(let department in data)
            {
                for(let batch in data[department])
                {
                    var arr = batch.split("-");
                    var start_year = parseInt(arr[1]);
                    for(let year in data[department][batch])
                    {
                        let year_no = parseInt(year.match(/\d$/));
                        if(data[department][batch][year] && (start_year+year_no-1 == i))
                        {
                            for(let achievement of data[department][batch][year])
                            {
                                var temp_arr = [];
                                temp_arr.push(...achievement, department, batch, `${year_no}`);
                                new_data[`${i}-${i+1}`].push(temp_arr);
                            }
                        }
                    }
                }
            }
        }
        //console.log(new_data);
        resolve(new_data);
    });
}

export default async function view_achievements(sheets, departments, batches, start_academic_year, end_academic_year)
{
    var data = {};

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    batches = await get_batches_within_academic_year(batches, start_academic_year, end_academic_year);

    var department_batches = await get_department_batches(departments, batches);

    var promises = [];
    for(let department in department_batches) {
        var promise = get_all_batches_data(gsheets, department_batches[department], start_academic_year, end_academic_year);
        promises.push(promise);
    }

    // console.log(batches, departments, start_academic_year, end_academic_year);

    var data_temp = await Promise.all(promises);
    for(let i in data_temp) {
        data[departments[i].code] = data_temp[i];
    }

    // console.log(data);
    var new_data = await get_data_in_format(data, start_academic_year, end_academic_year);

    return new_data;
}

// console.log(get_batches_within_academic_year(["batch-2019-2023"], 2024, 2026));