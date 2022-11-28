import { Router } from 'express';

import userRoutes from './users/user-routes';
import eventRoutes from './events/event-routes';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/events', eventRoutes);

export default router;
