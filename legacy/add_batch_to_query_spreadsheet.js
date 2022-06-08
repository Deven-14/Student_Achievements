
async function get_batch_sheet_name(batch) {
    return `${batch.departmentCode}-batch-${batch.fromYear}-${batch.toYear}`;
}

async function get_add_batch_sheet_requests(batchSheetName) {

    var requests = [];

    requests.push({
        addSheet: {
            properties: {
                title: batchSheetName
            }
        },
    });

    return requests;
}

async function get_add_importrange_formula_to_batch_sheet_requests(batch) {
    var values = [];
    values.push({
        userEnteredValue: {
            formulaValue: `=IMPORTRANGE(${batch.spreadsheetId}, "Sheet1!A:Z")`,
        }
    });

    var requests = [];

    requests.push({
        appendCells: {
            sheetId: i,
            rows: [{
                values: values //only one row with values = values
            }],
            fields: "*"
        }
    });

    return requests;

}

async function add_batch_to_query_spreadsheet(sheets, batch) {

    var requests = [];
    const batchSheetName = await get_batch_sheet_name(batch);
    const request1 = await get_add_batch_sheet_requests(batchSheetName);
    requests.push(...request1);

    

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