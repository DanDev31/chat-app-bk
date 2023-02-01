import { Router } from "express";
import controller from './controller';


const router = Router();

router.get('/getUser/:userId', controller.getUser);
router.get('/getContactInfo', controller.getContactInfo);
router.get('/getUserContacts/:userId', controller.getUserContacts);
router.post('/addContact', controller.addContactToUser);


export default router;