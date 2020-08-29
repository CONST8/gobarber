import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<{user: User}> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    return { user };
  }
}

export default CreateSessionService;
