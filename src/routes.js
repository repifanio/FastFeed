import { Router } from 'express';
import multer from 'multer';
import sessionController from './app/controller/sessionController';
import userController from './app/controller/userController';
import recipientController from './app/controller/recipientController';
import courierController from './app/controller/courierController';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import fileController from './app/controller/fileController';

const routes = Router();
const uploads = multer(multerConfig);

routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.get('/users', userController.index);

routes.get('/recipients', recipientController.index);
routes.post('/recipients', recipientController.store);
routes.put('/recipients', recipientController.update);
routes.get('/recipient/:cpf', recipientController.show);
routes.delete('/recipient/:cpf', recipientController.destroy);

routes.post('/files', uploads.single('file'), fileController.store);

routes.get('/couriers', courierController.index);
routes.get('/couriers/:id', courierController.show);
routes.post('/couriers', courierController.store);
routes.put('/couriers/:id', courierController.update);
routes.delete('/couriers/:id', courierController.destroy);

export default routes;
