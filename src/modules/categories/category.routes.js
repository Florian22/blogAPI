import {Router} from 'express';
import * as categoryController from './category.controllers';
import { authJwt } from '../../services/auth.services';
import validate from 'express-validation';
import categoryValidation from './category.validation';

const routes = new Router();
//routes.post('/', authJwt, validate(categoryValidation.addPlant),plantController.addPlant);
routes.post('/', authJwt, categoryController.createCategory);

export default routes;
