import { Router } from "express";
import { tokenValidation } from "./../../validations/tokenValidation.js";
import { signinValidation } from "./../../validations/adminAuthValidation.js";
import { signin, generateAccessTokenUsingRefreshToken } from "./../../controllers/adminAuthController.js";

const adminAuthRouter = Router();

adminAuthRouter.post("/signin", signinValidation, signin);

adminAuthRouter.post("/refreshToken", tokenValidation, generateAccessTokenUsingRefreshToken);

export default adminAuthRouter;