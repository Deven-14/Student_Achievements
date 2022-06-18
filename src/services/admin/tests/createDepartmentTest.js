import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import createDepartment from "./../createDepartment.js";

async function createDepartmentTest(sheets, drive, name, code) {

    await createDepartment(sheets, drive, name, code);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const name = "Information Science and Engineering";
    const code = "IS";
    await createDepartmentTest(sheets, drive, name, code);

    console.log("done");
}

main();