import { Request, Response } from 'express';
import SessionUserService from '../services/SessionUserService';
import { instanceToInstance } from 'class-transformer';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userSession = new SessionUserService();

    const user = await userSession.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
export default SessionsController;
