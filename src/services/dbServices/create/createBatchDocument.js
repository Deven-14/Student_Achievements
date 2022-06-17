import Batch from "./../../../models/Batch.js"

export default async function createBatchDocument(startYear) {
    try {
        
        const endYear = startYear + 4;
        const name = `batch-${startYear}-${endYear}`;

        await Batch.create({startYear, endYear, name});
        console.log("added batch", `batch-${startYear}-${endYear}`, "to database");

    } catch(error) {
        console.log(error);
        console.log("Error adding batch", `batch-${startYear}-${endYear}`, "to database");
        throw error;
    }
}