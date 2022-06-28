import { getBatchesToBeCreated, isDepartmentCreated } from "./../services/admin/index.js";


export async function studentAchievementsValidation(req, res, next) {

    try {

        var { batchStartYears, departmentCodes, fromYear, toYear } = req.query; // send batchStartYears[] in query 

        if(!(batchStartYears && departmentCodes && fromYear && toYear)) {
            return res.status(400).json({ error: "Missing Parameters" });
        }
        batchStartYears = batchStartYears.map(batchStartYear => parseInt(batchStartYear));
        fromYear = parseInt(fromYear);
        toYear = parseInt(toYear);

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


export async function addBatchValidation(req, res, next) {

    try {

        // router.use(isAdminValidation); not required coz we can keep different access_token_secrect for student and admin
        const { batchStartYear } = req.body;
        if(!batchStartYear) {
            return res.status(400).json({ error: "Missing Parameter" });
        }

        const batchesToBeCreated = await getBatchesToBeCreated();
        if(!batchesToBeCreated.find(batch => batch.startYear == batchStartYear)) {
            return res.status(400).json({ error: "Invalid Batch" });
        }

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

        const isDeptCreated = await isDepartmentCreated(code);
        if(isDeptCreated) {
            return res.status(409).json({ error: "Department Already Exists" });
        }

        return next();

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}