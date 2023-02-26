import express from "express";
import authRouter from "../api/auth/routes";
import userRouter from "../api/user/routes";
import conversationRouter from "../api/conversation/routes";
import messageRouter from "../api/message/routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use('/conversation', conversationRouter);
router.use('/message', messageRouter);

export default router;