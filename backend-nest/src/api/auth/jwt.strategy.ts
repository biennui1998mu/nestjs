import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from './../../shared/interface/jwt-payload.interface';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Model } from 'mongoose';
import { User } from './auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('user') private readonly userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: JwtPayload){
        const user = await this.userModel.findOne({gmail: payload.gmail});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}
