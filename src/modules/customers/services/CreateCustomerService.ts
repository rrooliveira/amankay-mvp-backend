import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  public async execute({ name, email, password }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already one customer with this email.');
    }

    const hashedPassword = await hash(password, 8);

    const user = customersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await customersRepository.save(user);

    return user;
  }
}

export default CreateCustomerService;
