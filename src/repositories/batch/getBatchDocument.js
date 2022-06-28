import Batch from "./../../models/Batch.js"

export default async function getBatchDocument(startYear) {
    try {
        
        const batch = await Batch.findOne({ startYear });
        console.log("get batch Document success");
        return batch;

    } catch(error) {
        console.log(error);
        console.log("Error getting batch Document");
        throw error;
    }
}