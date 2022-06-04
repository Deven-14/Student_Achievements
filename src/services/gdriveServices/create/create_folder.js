
export async function create_folder(gdrive, parentFolderId, folderName)
{
    var fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId]
    };

    try {

        const res = await gdrive.files.create({
            requestBody: fileMetadata,
            fields: "id"
        });

        console.log("Folder Name:", folderName, "\nFolder Id:", res.data.id);
        return res.data.id;

    } catch(error) {
        console.log(error);
        console.log("Error creating folder", folderName);
        throw error;
    }

}