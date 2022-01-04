import { Request, Response } from 'express';
import ForgotPasswordService from '../services/ForgotPasswordService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPassword = new ForgotPasswordService();

    await forgotPassword.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
