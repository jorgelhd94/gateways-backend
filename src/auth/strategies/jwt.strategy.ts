import { UserDocument } from './../schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IUser } from '../interfaces/IUser.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const { id } = payload;

    const user = await this.UserModel.findById({ id });

    if (!user) {
      throw new UnauthorizedException('Token no valid');
    }

    return user;
  }
}
