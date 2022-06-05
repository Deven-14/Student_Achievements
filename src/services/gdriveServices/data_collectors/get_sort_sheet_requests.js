
export default async function get_sort_sheet_requests(sheetId) {

    var requests = [];

    requests.push({
        sortRange: {
            range: {
                sheetId: sheetId, // added sheetId as properties in create format
                startRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 10
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