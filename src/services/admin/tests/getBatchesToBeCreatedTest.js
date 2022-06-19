import dotenv from "dotenv";
import dbConnect from "./../../../config/database.js";
import getBatchesToBeCreated from "./../getBatchesToBeCreated.js";

async function getBatchesToBeCreatedTest() {

    const batches = await getBatchesToBeCreated();
    console.log(batches);

}

async function main() {
    dotenv.config({ path: "./../../../../.env" });
    await dbConnect();

    await getBatchesToBeCreatedTest();

    console.log("done");
}

main();