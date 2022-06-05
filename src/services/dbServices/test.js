import dotenv from "dotenv";
import createBatchDocument from "./createBatchDocument.js";
import createDepartmentDocument from "./createDepartmentDocument.js";
import { dbConnect } from "../../config/database.js";

async function createBatchDocumentTest() {
    await createBatchDocument("A", 2019, 2023, "abc", "def", "ghi");
}

async function createDepartmentDocumentTest() {
    await createDepartmentDocument("Aaa", "A", "jkl");
}

async function main() {

    dotenv.config({ path: "./../../../.env" });
    await dbConnect();

    await createBatchDocumentTest();
    await createDepartmentDocumentTest();

    console.log("done");

}

main();