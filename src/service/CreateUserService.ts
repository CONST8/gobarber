import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({ email });

    const hashedPassword = await hash(password, 8);

    if (checkUserExist) {
      throw new AppError('Email address already used');
    }

    const user = userRepository.create({ name, email, password: hashedPassword });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
