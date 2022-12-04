import { Router } from 'express';

import { upload } from '../../services/multer';
import {
  createNewEvent,
  retrieveListsOfEvents,
  retrieveSingleEvent,
  insertNewMemberToEvent,
  insertListOfItems,
  addCollaboratorToItemList,
  getListCollaborators,
  removeCollaboration,
  getListOfMembers,
} from '../../controllers/event-controllers';

const router = Router();

router.post('/', upload.single('eventPic'), createNewEvent);
router.get('/all-events', retrieveListsOfEvents);
router.get('/single-event/:eventId', retrieveSingleEvent);
router.patch('/add-member/:userId/event/:eventId', insertNewMemberToEvent);
router.get('/member-list/:eventId', getListOfMembers);

router.post('/add-items/:eventId', insertListOfItems);
router.post('/add-item-collaborator/:userId/item/:itemId', addCollaboratorToItemList);
router.get('/collaborations/:itemId', getListCollaborators);
router.delete('/collaboration/:itemId/member/:userId', removeCollaboration);

export default router;
