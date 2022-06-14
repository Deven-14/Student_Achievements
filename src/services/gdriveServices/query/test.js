import dotenv from "dotenv";
import add_batch_to_query_spreadsheet from "./add_batch_to_query_spreadsheet.js";
import add_department_to_query_spreadsheet from "./add_department_to_query_spreadsheet.js";
import delete_department_from_query_spreadsheet from "./delete_department_from_query_spreadsheet.js";
import delete_batch_from_query_spreadsheet from "./delete_batch_from_query_spreadsheet.js";

async function add_batch_to_query_spreadsheet_test(batchName, departmentBatchList) {
    await add_batch_to_query_spreadsheet(batchName, departmentBatchList);
}

async function add_department_to_query_spreadsheet_test(departmentCode, departmentBatches) {
    await add_department_to_query_spreadsheet(departmentCode, departmentBatches);
}

async function delete_department_from_query_spreadsheet_test(departmentCode, departmentBatches) {
    await delete_department_from_query_spreadsheet(departmentCode, departmentBatches);
}

async function delete_batch_from_query_spreadsheet_test(batchName) {
    await delete_batch_from_query_spreadsheet(batchName);
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });

    const batchName = "batch-2017-2021";
    const departmentBatchList = [{
        "departmentCode": "IS",
        "batch": "",
        "folderId": "1QP8W3K8H9C5jzBGQmyVgtQczmjUk3GVJ",
        "achievementsSpreadsheetId": "1Hjgx2HshuH-3_ReiFl_M1Ijfe6wvq9O2B5BGRZImeQM",
        "certificatesFolderId": "1ueNwrB4ONUcBtTOGgrhCu_h9mDuY8CtH"
    }];

    const departmentCode = "CS";
    const departmentBatches = [{
        "departmentCode": "CS",
        "batch": {
            "fromYear": 2017,
            "toYear": 2021,
            "name": "batch-2017-2021"
        },
        "folderId": "1RpRuHINsOHNsg_59IgahDkebzS-a8-5n",
        "achievementsSpreadsheetId": "1zw5cyaEr8mSm77hhudjNEfECBXji26FB80At3HzkBJs",
        "certificatesFolderId": "15q9bcrXe7y-DlPwXMgoz556bV32p-fqf"
    }];

    // await add_batch_to_query_spreadsheet_test(batchName, departmentBatchList);
    // await add_department_to_query_spreadsheet_test(departmentCode, departmentBatches);
    // await delete_department_from_query_spreadsheet_test(departmentCode, departmentBatches);
    // await delete_batch_from_query_spreadsheet_test(batchName);
}

main();