import { drive } from "@googleapis/drive";
import { sheets } from "@googleapis/sheets";
import create_batch_for_department from "./create_batch_for_department.js";
import create_department_folder from "./create_department_folder.js";
import dotenv from "dotenv";

async function create_batch_for_department_test(folderId) {
    const res = await create_batch_for_department(sheets, drive, folderId, "batch-2018-2022");
    console.log(res);
}

async function create_department_folder_test() {
    const folderId = await create_department_folder(drive, "Bbbb", "B");
    console.log(folderId);
    return folderId;
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    const folderId = await create_department_folder_test();
    await create_batch_for_department_test(folderId);
}

main();