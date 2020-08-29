import { getRepository } from 'typeorm';

import { response } from 'express';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({ email });

    if (checkUserExist) {
      throw new Error('Email address already used');
    }

    const user = userRepository.create({ name, email, password });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
