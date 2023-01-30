import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh-jwt", controller.verifyRefreshToken);

export default router;