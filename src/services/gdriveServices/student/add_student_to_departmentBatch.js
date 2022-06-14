import get_auth from '../auth/get_auth.js';
import { get_sort_sheet1_requests } from './get_sort_sheet_requests.js';

async function get_add_student_data_requests(student, sheetId) {

    var data1 = [
        student.usn,
        student.name,
        student.email,
        student.phone
    ];
    var values = [];

    for(let ele of data1)
    {
        values.push({
            userEnteredValue: {
                stringValue: ele,
            }
        });
    }

    var requests = [];

    requests.push({
        appendCells: {
            sheetId: sheetId,
            rows: [
                {
                    values: values //only one row with values = values
                }
            ],
            fields: "*"
        }
    });

    return requests;
}

export default async function add_student_to_departmentBatch(sheets, student, departmentBatch) {

    const sheetId = 0;

    var requests = [];
    var requests1 = await get_add_student_data_requests(student, sheetId);
    var requests2 = await get_sort_sheet1_requests();
    requests.push(...requests1, ...requests2);

    const resource = {requests};

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    try {

        await gsheets.spreadsheets.batchUpdate({
            spreadsheetId : departmentBatch.achievementsSpreadsheetId,
            resource
        });

        console.log("added student", student);

    } catch(error) {
        console.log(error);
        console.log("Error adding student", student);
        throw error;
    }
    
}