import Batch from "./../../models/Batch.js"

export default async function getAllBatchDocumentsWithoutId() {
    try {
        
        const batches = await Batch.find({}, {_id: 0});
        console.log("get All Batch Documents without Id success");
        return batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting All Batch Documents without Id");
        throw error;
    }
}