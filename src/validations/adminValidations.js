import { getBatchesToBeCreated, getDepartmentDocument } from "./../services/index.js";


export async function studentAchievementsValidation(req, res, next) {

    try {

        const { batchStartYears, departmentCodes, fromYear, toYear } = req.body;
        if(!(batchStartYears && departmentCodes && fromYear && toYear)) {
            return res.status(400).json({ error: "Missing Parameters" });
        }
        // check if batchStartYears and departmentCodes are array when only one is selected
        req.batchStartYears = batchStartYears;
        req.departmentCodes = departmentCodes;
        req.fromYear = fromYear;
        req.toYear = toYear;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


// use student achievements validation for downloadAchievementsValidation
// export async function downloadAchievementsValidation(req, res, next) {

//     try {

//         const { batchStartYears, departmentCodes, fromYear, toYear } = req.body;
//         if(!(batchStartYears && departmentCodes && fromYear && toYear)) {
//             return res.status(400).json({ error: "Missing Parameters" });
//         }
//         // check if batchStartYears and departmentCodes are array when only one is selected
//         req.batchStartYears = batchStartYears;
//         req.departmentCodes = departmentCodes;
//         req.fromYear = fromYear;
//         req.toYear = toYear;
//         return next();

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }

// }


export async function addBatchValidation(req, res, next) {

    try {

        // router.use(isAdminValidation); not required coz we can keep different access_token_secrect for student and admin
        const { batchStartYear } = req.body;
        if(!batchStartYear) {
            return res.status(400).json({ error: "Missing Parameter" });
        }

        const batchesToBeCreated = await getBatchesToBeCreated();
        if(!batchesToBeCreated.find(batch => batch.batchStartYear == batchStartYear)) {
            return res.status(401).json({ error: "Invalid Batch" });
        }

        req.batchStartYear = batchStartYear;
        return next();

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


export async function addDepartmentValidation(req, res, next) {

    try {

        const { name, code } = req.body;
        if(!(name && code)) {
            return res.status(400).json({ error: "Missing Parameters" });
        }

        if(!(code.length == 2)) {
            return res.status(400).json({ error: "Wrong Department Code Length" });
        }

        const department = await getDepartmentDocument(code);
        if(department) {
            return res.status(409).json({ error: "Department Already Exists" });
        }

        req.name = name;
        req.code = code;
        return next();

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}