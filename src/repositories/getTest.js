import dotenv from "dotenv";
import dbConnect from "./../../config/database.js";
import getBatches from "./getBatches.js";
import getDepartments from "./getDepartments.js";
import getBatchesWithoutId from "./getBatchesWithoutId.js";
import getDepartmentBatches from "./getDepartmentBatches.js";
import getDepartmentBatchesOfADepartment from "./getDepartmentBatchesOfADepartment.js";
import getDepartmentNameAndCodes from "./getDepartmentNameAndCodes.js";


async function getBatchesTest() {
    console.log(await getBatches());
}

async function getDepartmentsTest() {
    console.log(await getDepartments());
}

async function getBatchesWithoutIdTest() {
    console.log(await getBatchesWithoutId());
}

async function getDepartmentBatchesTest() {
    console.log(await getDepartmentBatches());
}

async function getDepartmentBatchesOfADepartmentTest() {
    console.log(await getDepartmentBatchesOfADepartment("CS"));
}

async function getDepartmentNameAndCodesTest() {
    console.log(await getDepartmentNameAndCodes());
}

async function main() {

    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    // await getBatchesTest();
    // await getDepartmentsTest();
    // await getBatchesWithoutIdTest();
    // await getDepartmentBatchesTest();
    await getDepartmentBatchesOfADepartmentTest();
    // await getDepartmentNameAndCodesTest();

    console.log("done");

}

main();