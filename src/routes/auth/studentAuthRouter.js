import { Router } from "express";
import { tokenValidation } from "./../../validations/tokenValidation.js";
import { signupValidation,  signinValidation } from "./../../validations/studentAuthValidation.js";
import { signup, signin, generateAccessTokenUsingRefreshToken } from "./../../controllers/studentAuthController.js";

const studentAuthRouter = Router();

studentAuthRouter.post("/signup", signupValidation, signup);

studentAuthRouter.post("/signin", signinValidation, signin);

studentAuthRouter.post("/refreshToken", tokenValidation, generateAccessTokenUsingRefreshToken);

export default studentAuthRouter;