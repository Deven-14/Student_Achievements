import Batch from "./../../../models/Batch.js"

export default async function getBatches() {
    try {
        
        const batches = await Batch.find();
        console.log("get batches success");
        return batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting batches");
        throw error;
    }
}