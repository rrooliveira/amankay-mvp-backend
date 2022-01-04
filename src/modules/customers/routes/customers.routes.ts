import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isCustomerAuthenticated from '@shared/middleware/isCustomerAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/all', customersController.index);

customersRouter.get('/', isCustomerAuthenticated, customersController.show);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  '/',
  isCustomerAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
      oldPassword: Joi.string()
        .valid()
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  customersController.update,
);

// customersRouter.delete(
//   '/:id',
//   isCustomerAuthenticated,
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   customersController.delete,
// );

customersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  customersController.login,
);

export default customersRouter;
