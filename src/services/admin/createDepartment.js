import { 
    createDepartmentDocument, 
    createDepartmentBatchDocuments, 
    getAllBatchDocuments, 
    getDepartmentDocument,
    getDepartmentBatchDocumentsOfADepartment
} from "./../../repositories/index.js";
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

    var departmentBatchesOfADepartment = await create_batches_for_department(sheets, drive, department, batches);
    await createDepartmentBatchDocuments(departmentBatchesOfADepartment);
    
    departmentBatchesOfADepartment = await getDepartmentBatchDocumentsOfADepartment(code); // so that we get the populated version of department batches
    await add_department_to_query_spreadsheet(code, departmentBatchesOfADepartment);

}