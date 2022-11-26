import { Router } from 'express';

import { upload } from '../../services/multer';
import { retrieveUserInfo, createNewUser, getListOfUsers, updateUserInfo } from '../../controllers/user-controllers';

const router = Router();

router.get('/get/:userId', retrieveUserInfo);
router.post('/', createNewUser);
router.get('/user-lists', getListOfUsers);
router.put('/modify/:userId', upload.single('userPic'), updateUserInfo);

export default router;
