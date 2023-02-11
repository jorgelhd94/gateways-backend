import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const createdUser = new this.UserModel({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await createdUser.save();

      return {
        ...createdUser,
        token: this.getJwtToken({ id: createdUser._id }),
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // return this.GatewayModel.findById(id).exec();

    const user = await this.UserModel.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    }).exec();

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return { ...user, token: this.getJwtToken({ id: user._id }) };
  }

  private getJwtToken(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Check server logs');
  }
}
