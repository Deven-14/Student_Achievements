

export async function get_sort_sheet1_requests() {

    var requests = [];

    requests.push({
        sortRange: {
            range: {
                sheetId: 0, // added sheetId as properties in create format
                startRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 4
            },
            sortSpecs: [
                {
                    dimensionIndex: 0, // sort with respect to usn
                    sortOrder: "ASCENDING",
                }
            ]
        },
    });

    return requests;
}

export async function get_sort_sheet_year_requests(sheetId) {

    var requests = [];

    requests.push({
        sortRange: {
            range: {
                sheetId: sheetId, // added sheetId as properties in create format
                startRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 8 // CHANGE THIS IF EXTRA FIELDS ARE ADDED *******************8
            },
            sortSpecs: [
                {
                    dimensionIndex: 0, // sort with respect to usn
                    sortOrder: "ASCENDING",
                }
            ]
        },
    });

    return requests;
}