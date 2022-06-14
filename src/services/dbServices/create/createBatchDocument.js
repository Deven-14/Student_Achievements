import Batch from "./../../../models/Batch.js"

export default async function createBatchDocument(fromYear) {
    try {
        
        const toYear = fromYear + 4;
        const name = `batch-${fromYear}-${toYear}`;

        await Batch.create({fromYear, toYear, name});
        console.log("added batch", `batch-${fromYear}-${toYear}`, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding batch", `batch-${fromYear}-${toYear}`, "to database");
        throw error;
    }
}