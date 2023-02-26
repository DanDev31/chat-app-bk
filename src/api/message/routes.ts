import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get('/getMessages/:conversationId', controller.getMessages);
router.post('/newMessage', controller.createMessage);

export default router;