import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  updateProfilePicture(id: string, urlProfilePicture: string) {
      throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('User')
  private readonly userModel: Model<User>) {}

  async atualizarFotoPerfil(id: string, urlProfilePicture: string) {
    const user = await this.userModel.findOne({ id }).exec();

    user.urlProfilePicture = urlProfilePicture;

    return user.save();
  }
}
