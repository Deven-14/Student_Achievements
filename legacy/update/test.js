import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import addbatchIdToDepartmentDocument from "./addbatchIdToDepartmentDocument.js";
import addbatchIdsToDepartmentDocument from "./addbatchIdsToDepartmentDocument.js";
import addbatchIdToAllDepartmentDocuments from "./addbatchIdToAllDepartmentDocuments.js";
import getBatches from "./../get/getBatches.js";

async function addbatchIdToDepartmentDocumentTest(batchId, departmentCode) {
    await addbatchIdToDepartmentDocument(batchId, departmentCode);
}

async function addbatchIdsToDepartmentDocumentTest(batchIds, departmentCode) {
    await addbatchIdsToDepartmentDocument(batchIds, departmentCode);
}

async function addbatchIdToAllDepartmentDocumentsTest(batchId) {
    await addbatchIdToAllDepartmentDocuments(batchId);
}

async function main() {

    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const departmentCode = "CS";
    const batches = await getBatches();
    const batchId = batches[0]._id;    
    // await addbatchIdToDepartmentDocumentTest(batchId, departmentCode);

    const batchIds = [batches[0]._id, batches[1]._id];
    // await addbatchIdsToDepartmentDocumentTest(batchIds, departmentCode); // $addToSet works fine even for array of items and even array of items is working fine

    // await addbatchIdToAllDepartmentDocumentsTest(batchId); // add to set works correctly for this also

    console.log("done");

}

main();