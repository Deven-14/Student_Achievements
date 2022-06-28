import Batch from "./../../models/Batch.js";

export default async function getAllBatchDocuments() {
    try {
        
        const batches = await Batch.find();
        console.log("get All Batch Documents success");
        return batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting All Batch Documents");
        throw error;
    }
}