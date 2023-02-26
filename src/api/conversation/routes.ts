import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get('/getConversations/:userId', controller.getConversations);
router.post('/newConversation', controller.createConversation);
router.put('/updateConversation', controller.updateConversation);
router.delete('/deleteConversation', controller.deleteConversation);

export default router;