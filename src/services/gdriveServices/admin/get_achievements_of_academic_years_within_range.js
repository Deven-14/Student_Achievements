import get_auth from "./../auth/get_auth.js";

async function get_batches_within_years(batches, fromYear, toYear) {

    var new_batches = [];
    for(let batch of batches)
    {
        var begin = batch.startYear;
        var end = batch.endYear;
        if(fromYear < end && toYear > begin) {
            new_batches.push(batch);
        }
    }

    return new_batches;

}

async function get_batchNames(batches) {
    const batchNames = [];
    for(let batch of batches) {
        batchNames.push(`batch-${batch.startYear}-${batch.endYear}`);
    }
    return batchNames;
}

async function get_achievements_of_batches(gsheets, batches) {

    const batchNames = await get_batchNames(batches);

    const ranges = [];
    for(let batchName of batchNames) {
        ranges.push(`${batchName}!A2:J`);
    }

    if(ranges.length == 0) {
        return {};
    }

    try {

        const res = await gsheets.spreadsheets.values.batchGet({
            spreadsheetId: process.env.QUERY_SPREADSHEET_ID,
            ranges,
        });

        const achievements_of_batches = {};
        for(let i = 0; i < batchNames.length; ++i) {
            var rows = res.data.valueRanges[i].values;
            if(rows) {
                achievements_of_batches[batchNames[i]] = rows;
            }
        }

        return achievements_of_batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting achievements of batches");
        throw error;
    }

}

async function get_academic_years(fromYear, toYear) {
    const years = [];
    for(let i = fromYear; i < toYear; ++i) {
        years.push(`${i}-${i+1}`);
    }
    return years;
}

async function get_achievements_of_academic_years_of_batch(batchName, achievements_of_batch, academic_years, departmentCodesSet) {
    const achievements_of_academic_years = {};
    for(let academic_year of academic_years) {
        achievements_of_academic_years[academic_year] = [];
    }

    var [ , begin, ] = batchName.split("-");
    begin = parseInt(begin);
    
    const academic_year_of_yearOfAchievement = {};
    for(let i = 0; i < 4; ++i) {
        academic_year_of_yearOfAchievement[i+1] = `${begin+i}-${begin+i+1}`
    }

    for(let achievement of achievements_of_batch) {
        const departmentCode = achievement[achievement.length-2];
        const yearOfAchievement = achievement[achievement.length-1];
        const academic_year = academic_year_of_yearOfAchievement[yearOfAchievement];
        const achievements_of_academic_year = achievements_of_academic_years[academic_year];

        if(achievements_of_academic_year && departmentCodesSet.has(departmentCode)) {
            achievement.push(batchName);
            achievements_of_academic_year.push(achievement); 
        }
    }

    return achievements_of_academic_years;
}

async function get_achievements_of_academic_years(achievements_of_batches, departmentCodes, academic_years) {
    const achievements_of_academic_years = {};
    for(let academic_year of academic_years) {
        achievements_of_academic_years[academic_year] = [];
    }

    const departmentCodesSet = new Set(departmentCodes);
    const promises = [];
    for(let batchName in achievements_of_batches) {
        let promise = get_achievements_of_academic_years_of_batch(batchName, achievements_of_batches[batchName], academic_years, departmentCodesSet);
        promises.push(promise);
    }

    const achievements_of_academic_years_of_batches = await Promise.all(promises);
    for(let achievements_of_academic_years_of_batch of achievements_of_academic_years_of_batches) {
        for(let academic_year in achievements_of_academic_years_of_batch) {
            achievements_of_academic_years[academic_year].push(...achievements_of_academic_years_of_batch[academic_year]);
        }
    }

    return achievements_of_academic_years;
}

export default async function get_achievements_of_academic_years_within_range(sheets, batches, departmentCodes, fromYear, toYear) {

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    batches = await get_batches_within_years(batches, fromYear, toYear);

    const achievements_of_batches = await get_achievements_of_batches(gsheets, batches);

    const academic_years = await get_academic_years(fromYear, toYear);

    const achievements_of_academic_years = await get_achievements_of_academic_years(achievements_of_batches, departmentCodes, academic_years);

    return achievements_of_academic_years;
    
}