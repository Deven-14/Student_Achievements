import { createReadStream } from 'fs';

async function give_read_only_permission_to_student(drive, fileId, emailAddress) {

    const permission = {
        type: 'user',
        role: 'reader',
        emailAddress: emailAddress
    }

    try {

        await drive.permissions.create({
            resource: permission,
            fileId: fileId,
            fields: 'id',
            sendNotificationEmails: false
        });

    } catch(error) {
        console.log(error);
        console.log("Error giving read permission of certificate to student");
        throw error;
    }
    
}


export default async function upload_certificate_to_departmentBatch(drive, filepath, student, departmentBatch) {

    const filename = student.email;
    const fileMetadata = {
        name: `${filename}.pdf`,
        parents: [departmentBatch.certificatesFolderId]
    };

    const media = {
        mimeType: 'application/pdf',
        body: createReadStream(filepath)
    };

    const gauth = await get_auth(["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const res = await gdrive.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id, webViewLink",
            uploadType: 'media'
        });

        await give_read_only_permission_to_student(drive, res.data.id, student.email);

        return res.data.webViewLink;

    } catch(error) {
        console.log(error);
        console.log("Error uploading certificate to google drive");
        throw error;
    }
    
}