
export default async function create_spreadsheet(gdrive, parentFolderId, spreadsheetName) {

    var fileMetadata = {
        name: spreadsheetName,
        mimeType: 'application/vnd.google-apps.spreadsheet',
        parents: [parentFolderId]
    };

    try {

        const res = await gdrive.files.create({
            requestBody: fileMetadata,
            fields: "id"
        });

        console.log("Created spreadsheet Name:", spreadsheetName, ", spreadsheet Id:", res.data.id);
        return res.data.id;

    } catch(error) {
        console.log(error);
        console.log("Error creating spreadsheet", spreadsheetName);
        throw error;
    }

}