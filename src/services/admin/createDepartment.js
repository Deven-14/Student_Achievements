import { 
    createDepartmentDocument, 
    createDepartmentBatchDocuments, 
    getAllBatchDocuments, 
    getDepartmentDocument 
} from "./../dbServices/index.js";
import { 
    create_department_folder, 
    create_batches_for_department, 
    add_department_to_query_spreadsheet 
} from "./../gdriveServices/index.js";


export default async function createDepartment(sheets, drive, name, code) {

    const folderId = await create_department_folder(drive, name, code);
    await createDepartmentDocument(name, code, folderId);

    const departmentPromise = getDepartmentDocument(code);
    const batchesPromise = getAllBatchDocuments();
    const [department, batches] = await Promise.all([departmentPromise, batchesPromise]);

    const departmentBatches = await create_batches_for_department(sheets, drive, department, batches);
    await createDepartmentBatchDocuments(departmentBatches);
    
    await add_department_to_query_spreadsheet(code, departmentBatches);

}