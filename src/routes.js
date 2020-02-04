import { Router } from 'express';
import sessionController from './app/controller/sessionController';
import userController from './app/controller/userController';
import recipientController from './app/controller/recipientController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.get('/users', userController.index);

routes.get('/recipients', recipientController.index);
routes.post('/recipients', recipientController.store);
routes.put('/recipients', recipientController.update);
routes.get('/recipient', recipientController.show);
routes.delete('/recipient/:cpf', recipientController.destroy);

export default routes;
