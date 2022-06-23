import { Router } from "express";
import authRouter from "./auth/index.js";
import studentRouter from "./student/index.js";
import adminRouter from "./admin/index.js";

export {
    authRouter,
    studentRouter,
    adminRouter
}