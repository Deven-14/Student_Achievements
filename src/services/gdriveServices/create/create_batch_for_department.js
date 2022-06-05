import create_folder from './create_folder.js';
import get_auth from "../auth/get_auth.js";


async function create_spreadsheet(gdrive, parentFolderId, spreadsheetName) {

    var fileMetadata = {
        name: spreadsheetName,
        mimeType: 'application/vnd.google-apps.spreadsheet',
        parents: [parentFolderId]
    };

    try {

        const res = await gdrive.files.create({
            requestBody: fileMetadata,
            fields: "id"
        });

        console.log("Created spreadsheet Name:", spreadsheetName, ", spreadsheet Id:", res.data.id);
        return res.data.id;

    } catch(error) {
        console.log(error);
        console.log("Error creating spreadsheet", spreadsheetName);
        throw error;
    }

}


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
    requests.push(...requests1, ...requests2, ...requests3);

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

export default async function create_batch_for_department(sheets, drive, departmentFolderId, batchName) {

    var gauth = await get_auth(["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});
    gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    const batchFolderId = await create_folder(gdrive, departmentFolderId, batchName);
    const promise1 = create_spreadsheet(gdrive, batchFolderId, "Achievements");
    const promise2 = create_folder(gdrive, batchFolderId, "Certificates");
    const [spreadsheetId, certificatesFolderId] = await Promise.all([promise1, promise2]);
    await make_batch_spreadsheet_general_format(gsheets, spreadsheetId);

    return {folderId: batchFolderId, spreadsheetId, certificatesFolderId};
    
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