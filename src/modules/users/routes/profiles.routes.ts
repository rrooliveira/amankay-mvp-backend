import { Router } from 'express';
import ProfilesController from '../controllers/ProfilesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isUserAuthenticated from '@shared/middleware/isUserAuthenticated';

const profilesRouter = Router();
const profilesController = new ProfilesController();

profilesRouter.use(isUserAuthenticated);

profilesRouter.get('/', profilesController.show);

profilesRouter.put(
  '/',
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
  profilesController.update,
);

export default profilesRouter;
