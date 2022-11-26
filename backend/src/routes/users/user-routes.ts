import { Router } from 'express';

import { retrieveUserInfo, createNewUser, getListOfUsers } from '../../controllers/user-controllers';

const router = Router();

router.get('/get/:userId', retrieveUserInfo);
router.post('/', createNewUser);
router.get('/user-lists', getListOfUsers);

export default router;
