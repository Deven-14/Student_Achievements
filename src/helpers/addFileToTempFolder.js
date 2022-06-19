
export default async function addFileToTempFolder(file, filename) {

    const filepath = `./temp/${filename}`; // only allow to upload pdf
    await file.mv(filepath, (error) => {
        if(error) {
            console.log("Certificate Upload to node js server Failed", error);
            throw new Error("Certificate Upload Failed");
        } else {
            //console.log("file uploaded to node js server");
            return filepath;
        }
    });
}