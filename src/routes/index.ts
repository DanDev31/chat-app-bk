import express from "express";
import authRouter from "../api/auth/routes";
import userRouter from "../api/user/routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;