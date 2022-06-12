// import { google } from 'googleapis';

// // service account key file from Google Cloud console.
// // const KEYFILEPATH = './auth/service_account_credentials.json';
// const KEYFILEPATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// // Request full drive access.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'];

// // Create a service account initialize with the service account key file and scope needed
// const auth = new google.auth.GoogleAuth({
//     keyFile: KEYFILEPATH,
//     scopes: SCOPES
// });

// export default auth;

import { auth } from "@googleapis/drive";

export default async function get_auth(scopes) {
    
    // const KEYFILEPATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const KEYFILEPATH = './../../../config/service_account_credentials.json';

    const gAuth = new auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: scopes
    });

    return gAuth;
}