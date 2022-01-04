import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import SessionCustomerService from '../services/SessionCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const customerId = request.customer.id;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id: customerId });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
      password,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body;
    const customerId = request.customer.id;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id: customerId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json({});
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const customerSession = new SessionCustomerService();

    const customer = await customerSession.execute({
      email,
      password,
    });

    return response.json(customer);
  }
}

export default CustomersController;
