import { AuthCredentiasDto } from './auth-credentials.dto';
import { User } from './../../dist/auth/auth.model.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async singUp(AuthCredentiasDto: AuthCredentiasDto) {
    const { gmail, password } = AuthCredentiasDto;

    if (!gmail || typeof gmail !== 'string' || gmail.length === 0) {
      throw new NotFoundException('gmail is empty');
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
      throw new NotFoundException('password is empty');
    }

    const newUser = new this.userModel({
      gmail,
      password,
    });

    if (newUser) {
        return newUser as User;
    }
  }
}
