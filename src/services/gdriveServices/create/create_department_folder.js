import create_folder from "./create_folder.js";
import get_auth from "../auth/get_auth.js";

// export async function create_department_folders() {

//     const folderId = process.env.STUDENT_ACHIEVEMENTS_FOLDER_ID;
//     const drive = google.drive({version: 'v3', auth});

//     var promises = [];
//     for(let department of ALL_DEPARTMENTS) {
//         var promise = create_folder(drive, folderId, department);
//         promises.push(promise);
//     }

//     const folderIds = await Promise.all(promises);
//     return folderIds;

// }

export default async function create_department_folder(drive, departmentName, departmentCode) {

    // const drive = google.drive({version: 'v3', auth});

    const gauth = await get_auth(["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const folderId = await create_folder(
            gdrive, 
            process.env.STUDENT_ACHIEVEMENTS_FOLDER_ID, 
            departmentCode + " - " + departmentName
        );
        return folderId;

    } catch(error) {
        console.log(error);
        console.log("Couldn't create department folder", departmentCode, departmentName);
        throw error;
    }

}