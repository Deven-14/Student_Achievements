import Batch from "./../../../../models/Batch.js"

export default async function getBatchDocuments(startYears) {
    try {
        
        const batches = await Batch.find({ startYear: { $in: startYears }});
        console.log("get Batch Documents success");
        return batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting Batch Documents");
        throw error;
    }
}