const {google} = require('googleapis');
const auth = require("../auth/get_auth");
const {student_achievements_folder_id, all_departments} = require('../auth/protected_data');

function create_department_folder(drive, folderId, department)
{
    return new Promise((resolve, reject) => {

        var fileMetadata = {
            'name': department,
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [folderId]
        };

        drive.files.create({
            resource: fileMetadata,
            fields: "id"
        }, function (err, file) {
            if (err) {
                console.error(err);
            } else {
                console.log('File(Folder) Id: ', file.data.id);
                resolve(file.data.id);
            }
        });
    });
}

async function main()
{ 
    const folderId = student_achievements_folder_id;
    const departments = all_departments;
    const drive = google.drive({version: 'v3', auth});
    for(let department of departments)
    {
        await create_department_folder(drive, folderId, department); // can do this without await, that would be better, but we will have to count if all are done... so i put await so that we won't have to count and see if it is done
    }
}

main();