import { STUDENT_ACHIEVEMENTS_BATCH_START_YEAR } from "../../config/constants.js";
import { getAllBatchDocuments } from "./../dbServices/index.js";

export default async function getBatchesToBeCreated() {
    try {
        
        const createdBatches = await getAllBatchDocuments();
        const createdBatchesSet = new Set(createdBatches.map(batch => batch.startYear));

        const toBeCreatedBatches = [];
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        for(let i = STUDENT_ACHIEVEMENTS_BATCH_START_YEAR; i < currentYear; ++i) {
            if(!createdBatchesSet.has(i)) {
                toBeCreatedBatches.push({
                    startYear: i,
                    endYear: i + 4,
                    name: `batch-${i}-${i + 4}`
                });
            }
        }

        if(currentMonth >= 7) {
            if(!createdBatchesSet.has(currentYear)) {
                toBeCreatedBatches.push({
                    startYear: i,
                    endYear: i + 4,
                    name: `batch-${i}-${i + 4}`
                });
            }
        }

        console.log("get Batches to be created success");
        return toBeCreatedBatches;

    } catch(error) {
        console.log(error);
        console.log("Error getting Batches to be created");
        throw error;
    }
}