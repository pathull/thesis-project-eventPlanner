import { Router } from 'express';

import { upload } from '../../services/multer';
import {
  createNewEvent,
  retrieveListsOfEvents,
  retrieveSingleEvent,
  insertNewMemberToEvent,
  insertListOfItems,
} from '../../controllers/event-controllers';

const router = Router();

router.post('/', upload.single('eventPic'), createNewEvent);
router.get('/all-events', retrieveListsOfEvents);
router.get('/single-event/:eventId', retrieveSingleEvent);
router.patch('/add-member/:userId/event/:eventId', insertNewMemberToEvent);

router.post('/add-items/:eventId', insertListOfItems);

export default router;
