import get_auth from "./../../auth/get_auth.js";
import create_folder from './create_folder.js';
import create_spreadsheet from "./create_spreadsheet.js";
import fetch from "node-fetch";
import Batch from "./../../../../models/Batch.js";

async function get_append_sheet1_headers_requests() {

    var headers = ["USN", "Name", "Bmsce Mail", "Phone Number", "nAwardsYear1", "nAwardsYear2", "nAwardsYear3", "nAwardsYear4"];
    var values = [];

    for (let header of headers) {
        values.push({
            userEnteredValue: {
                stringValue: header,
            }
        });
    }

    var requests = [{
        appendCells: {
            sheetId: 0,
            rows: [{
                values: values //only one row with values = values
            }],
            fields: "*"
        }
    }];

    return requests;
}

async function get_add_sheet1_nawards_formula_requests() {

    var values = [];

    for (let i = 1; i <= 4; ++i) {
        values.push({
            userEnteredValue: {
                formulaValue: `=ARRAYFORMULA(IFNA(VLOOKUP(C2:C, QUERY(year${i}!C2:C, "select C, COUNT(C) group by C", -1), 2, FALSE), IF(LEN(C2:C) > 0, 0, )))`,
            }
        });
    }

    var requests = [{
        updateCells: {
            rows: [{
                values: values //only one row with values = values
            }],
            fields: "*",
            range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: 2,
                startColumnIndex: 4,
                endColumnIndex: 8
            }
              
        }
    }];

    return requests;
}

async function get_add_year_sheets_requests() {

    var requests = [];

    for (let i = 1; i <= 4; ++i) {
        requests.push({
            addSheet: {
                properties: {
                    sheetId: i,
                    title: `year${i}`
                }
            },
        });
    }

    return requests;
}

async function get_append_year_sheet_headers_requests() {

    var headers = [
        "USN",
        "Name",
        "Bmsce Mail",
        "Name of Event",
        "Details or Location of Event",
        "Level",
        "Award",
        "CertificateUrl"
    ];
    var values = [];

    for (let header of headers) {
        values.push({
            userEnteredValue: {
                stringValue: header,
            }
        });
    }

    var requests = [];

    for (let i = 1; i <= 4; ++i) {
        requests.push({
            appendCells: {
                sheetId: i,
                rows: [{
                    values: values //only one row with values = values
                }],
                fields: "*"
            }
        });
    }

    return requests;

}

async function make_batch_spreadsheet_general_format(gsheets, spreadsheetId) {

    var requests = [];
    var requests1 = await get_append_sheet1_headers_requests();
    var requests2 = await get_add_year_sheets_requests();
    var requests3 = await get_append_year_sheet_headers_requests();
    var requests4 = await get_add_sheet1_nawards_formula_requests();
    requests.push(...requests1, ...requests2, ...requests3, ...requests4);

    const resource = { requests };

    try {

        await gsheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource
        });

        console.log("made spreadsheet general format : ", spreadsheetId);
        return "made spreadsheet general format : " + spreadsheetId;

    } catch(error) {
        console.log(error);
        console.log("Error making spreadsheet", spreadsheetId, "into general format");
    }

}

// do not export this function coz, the fetch call cannot be concurrent and hence it is moved to the create_batch_for_departments function
async function create_batch_for_department(gsheets, gdrive, department, batch) {

    const batchName = `batch-${batch.fromYear}-${batch.toYear}`;
    const batchFolderId = await create_folder(gdrive, department.folderId, batchName);
    const promise1 = create_spreadsheet(gdrive, batchFolderId, "Achievements");
    const promise2 = create_folder(gdrive, batchFolderId, "Certificates");
    const [spreadsheetId, certificatesFolderId] = await Promise.all([promise1, promise2]);

    await make_batch_spreadsheet_general_format(gsheets, spreadsheetId);

    return {
        departmentCode: department.code, 
        fromYear: batch.fromYear, 
        toYear: batch.toYear, 
        folderId: batchFolderId, 
        spreadsheetId, 
        certificatesFolderId
    };
}

// this function cannot be performed concurrently, i.e don't call this function in Promise.all()
async function add_batch_to_query_spreadsheet(batchName, batchDetails) {

    const batchSpreadsheetIds = [];
    const departmentCodes = [];

    batchDetails.forEach(ele => {
        batchSpreadsheetIds.push(ele.spreadsheetId);
        departmentCodes.push(ele.departmentCode);
    });

    const body = {
        token: process.env.APPS_SCRIPT_TOKEN,
        batchName: batchName,
        batchSpreadsheetIds: batchSpreadsheetIds,
        departmentCodes: departmentCodes
    }
    try {
        await fetch(
            `https://script.google.com/macros/s/${process.env.APPS_SCRIPT_WEB_APP_ID}/exec`, {
                method: 'post',
                body: JSON.stringify(body)
            }
        );
    } catch(error) {
        console.log(error);
        console.log("Failed to add batch to query spreadsheet");
        throw error;
    }
}

export default async function create_batch_for_departments(sheets, drive, departments, batch) {

    var gauth = await get_auth(["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});
    gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    const promises = [];
    for(let department of departments) {
        let promise = create_batch_for_department(gsheets, gdrive, department, batch);
        promises.push(promise);
    }

    const batchDetails = await Promise.all(promises);

    const batchName = `batch-${batch.fromYear}-${batch.toYear}`;
    await add_batch_to_query_spreadsheet(batchName, batchDetails);

    return batchDetails;

}

// function create_batch_for_all_departments(sheets, batch) {
//     return new Promise(async(resolve, reject) => {

//         const drive = google.drive({ version: 'v3', auth });

//         const departments = all_departments;
//         const department_ids = await get_department_ids(auth, index_table_id);

//         var promises = [];
//         for (let department of departments) // creating all the spreadsheets first as this has to done sequentially and slowly because of user rate limit exceeded
//         {
//             let promise = create_spread_sheet(drive, department_ids[department], batch);
//             promises.push(promise);
//         }
//         var spreadsheetIds = await Promise.all(promises);

//         resolve(spreadsheetIds);

//     });
// }


// async function main(year) {
//     return new Promise(async(resolve, reject) => {

//         if (!(typeof year == 'number' && year > 2017)) {
//             reject("Fail");
//         }

//         const sheets = google.sheets({ version: 'v4', auth });

//         var batch = `batch-${year}-${year+4}`;

//         var isPresent = await isBatchPresent(auth, index_table_id, batch);

//         if (isPresent == true) {
//             console.log("batch already present");
//             reject("batch already present");
//         } else {

//             // var spreadsheetIds = await create_batch_for_all_departments(sheets, batch);

//             // var promises = [];
//             // for (let spreadsheetId of spreadsheetIds) {
//             //     let promise = make_batch_general_format(sheets, spreadsheetId);
//             //     promises.push(promise);
//             // }
//             // await Promise.all(promises);

//             console.log("Done with all Departments");
//             resolve("Done with all Departments");
//         }
//     });
// }

// main(2019);

// export default main;