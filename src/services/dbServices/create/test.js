import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import mongoose from "mongoose";
import createBatchDocument from "./createBatchDocument.js";
import createDepartmentDocument from "./createDepartmentDocument.js";
import createDepartmentBatchDocuments from "./createDepartmentBatchDocuments.js";
import getBatches from "./../get/getBatches.js";

async function createBatchDocumentTest(batchFromYear) {
    await createBatchDocument(batchFromYear);
}

async function createDepartmentDocumentTest(department) {
    await createDepartmentDocument(department.name, department.code, department.folderId);
}

async function createDepartmentBatchDocmentsTest(departmentBatches) {
    await createDepartmentBatchDocuments(departmentBatches)
}

async function main() {

    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const CS = {
        name: "Computer Science and Engineering",
        code: "CS",
        folderId: "z"
    }
    const IS = {
        name: "Information Science and Engineering",
        code: "IS",
        folderId: "y"
    }

    const departmentBatches = [{
        "departmentCode": "CS",
        "batch": "",
        "folderId": "a",
        "achievementsSpreadsheetId": "b",
        "certificatesFolderId": "c"
    },{
        "departmentCode": "IS",
        "batch": "",
        "folderId": "d",
        "achievementsSpreadsheetId": "e",
        "certificatesFolderId": "f"
    },{
        "departmentCode": "CS",
        "batch": "",
        "folderId": "g",
        "achievementsSpreadsheetId": "h",
        "certificatesFolderId": "i"
    },{
        "departmentCode": "IS",
        "batch": "",
        "folderId": "k",
        "achievementsSpreadsheetId": "l",
        "certificatesFolderId": "m"
    }]

    // await createBatchDocumentTest(2019);
    // await createBatchDocumentTest(2018);
    // await createDepartmentDocumentTest(CS);
    // await createDepartmentDocumentTest(IS);

    const batches = await getBatches();
    departmentBatches[0].batch = batches[0]._id;
    departmentBatches[1].batch = batches[0]._id;
    departmentBatches[2].batch = batches[1]._id;
    departmentBatches[3].batch = batches[1]._id;

    await createDepartmentBatchDocmentsTest(departmentBatches);

    console.log("done");

}

main();