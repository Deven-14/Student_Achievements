import dotenv from "dotenv";
import createBatchDocument from "./createBatchDocument.js";
import createDepartmentDocument from "./createDepartmentDocument.js";
import dbConnect from "../../config/database.js";
import getBatches from "./getBatches.js";
import getDepartments from "./getDepartments.js";

async function createBatchDocumentTest() {
    await createBatchDocument("A", 2019, 2023, "abc", "def", "ghi");
}

async function createDepartmentDocumentTest() {
    await createDepartmentDocument("Aaa", "A", "jkl");
}

async function getBatchesTest() {
    console.log(await getBatches());
}

async function getDepartmentsTest() {
    console.log(await getDepartments());
}



async function main() {

    dotenv.config({ path: "./../../../.env" });
    await dbConnect();

    // await createBatchDocumentTest();
    // await createDepartmentDocumentTest();

    await getBatchesTest();
    await getDepartmentsTest();

    console.log("done");

}

main();