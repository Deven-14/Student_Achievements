import get_auth from '../auth/get_auth.js';
import get_sort_sheet_requests from './get_sort_sheet_requests.js';

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

    // var data2 = [
    //     "=COUNTIF(year1!C2:C, Sheet1!C2:C)", // Sheet1!C2:C is required coz C2:C didn't work using api
    //     "=COUNTIF(year2!C2:C, Sheet1!C2:C)",
    //     "=COUNTIF(year3!C2:C, Sheet1!C2:C)",
    //     "=COUNTIF(year4!C2:C, Sheet1!C2:C)"
    // ];

    // for(let ele of data2)
    // {
    //     values.push({
    //         userEnteredValue: {
    //             formulaValue: ele,
    //         }
    //     });
    // }

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

export default async function add_student_to_batch(sheets, student, batchSpreadsheetId) {

    const sheetId = 0;

    var requests = [];
    var requests1 = await get_add_student_data_requests(student, sheetId);
    var requests2 = await get_sort_sheet_requests(sheetId);
    requests.push(...requests1, ...requests2);

    const resource = {requests};

    const gauth = await get_auth(["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets({version: 'v4', auth: gauth});

    try {

        await gsheets.spreadsheets.batchUpdate({
            spreadsheetId : batchSpreadsheetId,
            resource
        });

        console.log("added student", student);

    } catch(error) {
        console.log(error);
        console.log("Error adding student", student);
        throw error;
    }
    
}