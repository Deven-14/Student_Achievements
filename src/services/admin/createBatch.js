import { 
    createBatchDocument, 
    createDepartmentBatchDocuments, 
    getBatchDocument, 
    getAllDepartmentDocuments
} from "./../dbServices/index.js";
import { create_batch_for_departments, add_batch_to_query_spreadsheet } from "./../gdriveServices/index.js";


export default async function createBatch(sheets, drive, startYear) {

    await createBatchDocument(startYear);

    const batchPromise = getBatchDocument(startYear);
    const departmentsPromise = getAllDepartmentDocuments();
    const [batch, departments] = await Promise.all([batchPromise, departmentsPromise]);

    const departmentBatches = await create_batch_for_departments(sheets, drive, departments, batch);
    await createDepartmentBatchDocuments(departmentBatches);

    await add_batch_to_query_spreadsheet(batch.name, departmentBatches);

}