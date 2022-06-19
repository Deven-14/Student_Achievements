import { Router } from "express";
import authRouter from "./auth/index.js";
import studentRouter from "./student/index.js";
import adminRouter from "./admin/index.js";

const resourceRouter = Router();

resourceRouter.use("/student", studentRouter);

resourceRouter.use("/admin", adminRouter);

export {
    authRouter,
    resourceRouter
}