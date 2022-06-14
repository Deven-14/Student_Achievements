import Batch from "./../../../models/Batch.js"

export default async function getBatchesWithoutId() {
    try {
        
        const batches = await Batch.find({}, {_id: 0});
        console.log("get batches success");
        return batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting batches");
        throw error;
    }
}