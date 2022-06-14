import { drive } from "@googleapis/drive";
import { sheets } from "@googleapis/sheets";
import dotenv from "dotenv";
import Department from "./../../../models/Department.js";
import create_batch_for_departments from "./create_batch_for_departments.js";
import create_department_folder from "./create_department_folder.js";

async function create_batch_for_departments_test(departments, batch) {
    const res = await create_batch_for_departments(sheets, drive, departments, batch);
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
    // const batchName = "batch-2018-2022";
    // const batch = {
    //     fromYear: 2020,
    //     toYear: 2024
    // }
    const batch = {
        fromYear: 2017,
        toYear: 2021,
        name: `batch-2017-2021`
    }

    const department1 = new Department();
    department1.name = "Information Science and Engineering";
    department1.code = "IS";
    department1.folderId = "13kFhxCxIRZHS-IKrHswotLfMqeclQV7O"; // IS

    const department2 = new Department();
    department2.name = "Computer Science and Engineering";
    department2.code = "CS";
    department2.folderId = "1tzj5l3LBP7WPlMf6Vw9icsJhaXWp11nr"; // CS

    // department.folderId = await create_department_folder_test(department);

    const departments = [department1, department2];
    await create_batch_for_departments_test(departments, batch);
}

main();