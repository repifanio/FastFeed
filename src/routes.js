import { Router } from 'express';
import sessionController from './app/controller/sessionController';
import userController from './app/controller/userController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.get('/users', userController.index);

export default routes;
