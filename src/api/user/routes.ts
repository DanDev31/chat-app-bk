import { Router } from "express";
import controller from './controller';


const router = Router();

router.get('/getUser', controller.getUser);
router.get('/getUserContacts/:userId', controller.getUserContacts);
router.post('/addContact', controller.addContactToUser);


export default router;