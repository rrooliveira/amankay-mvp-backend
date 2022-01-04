import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  oldPassword: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, customer.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      customer.password = await hash(password, 8);
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
