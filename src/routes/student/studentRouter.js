import { Router } from "express";
import fileUpload from "express-fileupload";
import { tokenValidation } from "./../../validations/tokenValidation.js";
import { studentAuthorization } from "./../../middlewares/auth.js";
import { addAchievementValidation, uploadCertificateValidation } from "./../../validations/studentValidation.js";
import { addAchievement, viewAchievements, uploadCertificate } from "./../../controllers/studentController.js";

const studentRouter = Router();

studentRouter.use(fileUpload());
studentRouter.use(tokenValidation, studentAuthorization);

studentRouter.post("/addAchievement", addAchievementValidation, addAchievement);

studentRouter.post("/viewAchievements", viewAchievements);

studentRouter.post("/uploadCertificate", uploadCertificateValidation, uploadCertificate);

export default studentRouter;