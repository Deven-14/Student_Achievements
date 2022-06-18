import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import createBatch from "./../createBatch.js";

async function createBatchTest(sheets, drive, startYear) {

    await createBatch(sheets, drive, startYear);
    
}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    const startYear = 2019;
    await createBatchTest(sheets, drive, startYear);

    console.log("done");
}

main();