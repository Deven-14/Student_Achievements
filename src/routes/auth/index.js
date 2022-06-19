import { Router } from "express";
import adminAuthRouter from "./adminAuthRouter.js";
import studentAuthRouter from "./studentAuthRouter.js";

const authRouter = Router();

authRouter.use("/student", studentAuthRouter);

authRouter.use("/admin", adminAuthRouter);

export default authRouter;