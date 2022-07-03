import { getAllBatchDocumentsWithoutId } from "./../../repositories/index.js";

export default async function getBatches() {
    try {
        
        const batches = await getAllBatchDocumentsWithoutId();
        return batches;

    } catch(error) {
        console.log(error);
        console.log("Error getting Batches to be created");
        throw error;
    }
}