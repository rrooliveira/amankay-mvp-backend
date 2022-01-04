import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import passwordsRouter from '@modules/users/routes/passwords.route';
import profilesRouter from '@modules/users/routes/profiles.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'API Sales Project' });
});

routes.use('/users', usersRouter);
routes.use('/passwords', passwordsRouter);
routes.use('/profiles', profilesRouter);
routes.use('/customers', customersRouter);

export default routes;
