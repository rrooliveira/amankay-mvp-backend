import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  customer: Customer;
  token: string;
}

class SessionCustomerService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const passwordConfirmed = await compare(password, customer.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: customer.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      customer,
      token,
    };
  }
}

export default SessionCustomerService;
