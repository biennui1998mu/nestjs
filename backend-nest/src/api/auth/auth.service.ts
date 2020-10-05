import { User } from './auth.model';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { returnData } from 'src/shared/interface/returnData.interface';
import { JwtPayload } from 'src/shared/interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt: number) {
    return bcrypt.hash(password, salt);
  }

  async singUp(authCredentialDto: AuthCredentialDto): Promise<returnData> {
    const { gmail, password } = authCredentialDto;

    if (!gmail || typeof gmail !== 'string' || gmail.length === 0) {
      return {
        message: 'Gmail field is empty!',
        data: null,
      };
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
      return {
        message: 'Password field is empty!',
        data: null,
      };
    }

    const exist = await this.userModel.findOne({ gmail: gmail }).exec();

    if (exist) {
      return {
        message: 'Gmail is exist!',
        data: null,
      };
    }

    // const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, 10);

    const newUser = new this.userModel({
      gmail,
      password: hashedPassword,
    });

    const saved = await newUser.save();

    if (!saved) {
      return {
        message: 'Create new user fail!',
        data: null,
      };
    }

    /**
     * change saved to object and
     * remove field password in object
     */
    const savedObject = saved.toObject();
    delete savedObject.password;

    return {
      message: 'Register successfully!',
      data: savedObject,
    } as returnData;
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<returnData> {
    const { gmail, password } = authCredentialDto;

    if (!gmail || typeof gmail !== 'string' || gmail.length === 0) {
      return {
        message: 'Gmail field is empty!',
        data: null,
      };
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
      return {
        message: 'Password field is empty!',
        data: null,
      };
    }

    const user = await this.userModel
      .findOne({ gmail: gmail })
      .select('+password')
      .exec();

    if (!user) {
      return {
        message: 'User does not exist in database',
        data: null,
      };
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return {
        message: 'Password does not match!',
        data: null,
      };
    }

    const payload: JwtPayload = { gmail };
    const token = await this.jwtService.sign(payload);

    return {
      message: 'Login successfully !',
      data: token,
    };
  }
}
