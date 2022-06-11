import { drive } from "@googleapis/drive";
import { sheets } from "@googleapis/sheets";
import Department from "./../../../models/Department.js";
import create_batch_for_department from "./create_batch_for_department.js";
import create_department_folder from "./create_department_folder.js";
import dotenv from "dotenv";

async function create_batch_for_department_test(department, batchName) {
    const res = await create_batch_for_department(sheets, drive, department, batchName);
    console.log(res);
}

async function create_department_folder_test(department) {
    const folderId = await create_department_folder(drive, department.name, department.code);
    console.log(folderId);
    return folderId;
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });

    // const batchName = "batch-2019-2023";
    const batchName = "batch-2018-2022";

    const department = new Department();
    // department.name = "Information Science and Engineering";
    // department.code = "IS";
    department.name = "Computer Science and Engineering";
    department.code = "CS";
    
    // department.folderId = await create_department_folder_test(department);
    // department.folderId = "13kFhxCxIRZHS-IKrHswotLfMqeclQV7O"; // IS
    department.folderId = "1tzj5l3LBP7WPlMf6Vw9icsJhaXWp11nr"; // CS
    await create_batch_for_department_test(department, batchName);
}

main();