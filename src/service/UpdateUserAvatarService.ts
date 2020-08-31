import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import Users from '../models/User';

interface RequestDTO {
  userId: string;
   avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: RequestDTO): Promise<Users> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticad users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
