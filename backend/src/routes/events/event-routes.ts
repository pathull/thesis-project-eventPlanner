import { Router } from 'express';

import { upload } from '../../services/multer';
import { createNewEvent, retrieveListsOfEvents, retrieveSingleEvent } from '../../controllers/event-controllers';

const router = Router();

router.post('/', upload.single('eventPic'), createNewEvent);
router.get('/all-events', retrieveListsOfEvents);
router.get('/single-event/:eventId', retrieveSingleEvent);

export default router;
