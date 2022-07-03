import { Router } from "express";
import { tokenValidation } from "./../../validations/tokenValidation.js";
import { adminAuthorization } from "./../../middlewares/auth.js";
import { studentAchievementsValidation, addBatchValidation, addDepartmentValidation } from "./../../validations/adminValidations.js";
import { 
    studentAchievements, downloadAchievements, addBatch, addDepartment, 
    batchesToBeCreated, getCreatedBatches, getCreatedDepartments 
} from "./../../controllers/adminController.js";

const adminRouter = Router();

adminRouter.use(tokenValidation, adminAuthorization);

adminRouter.get("/studentAchievements", studentAchievementsValidation, studentAchievements);

adminRouter.get("/studentAchievements/download", studentAchievementsValidation, downloadAchievements);

adminRouter.post("/addBatch", addBatchValidation, addBatch);

adminRouter.post("/addDepartment", addDepartmentValidation, addDepartment);

adminRouter.get("/batchesToBeCreated", batchesToBeCreated);

adminRouter.get("/batches", getCreatedBatches);

adminRouter.get("/departments", getCreatedDepartments);

export default adminRouter;