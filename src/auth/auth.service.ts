import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SignUpDto } from './DTOs/sign-up.dto';
import { SigninDto } from './DTOs/sign-in.dto';
import { User } from './schemas/User.schema';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser({ username, password }: SignUpDto) {
    const userExists = await this.userModel.findOne({ username });
    if (userExists) throw new BadRequestException('Username already in use');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();

    const token = await this.jwtService.signAsync({ sub: user.id, username });
    return { access_token: token };
  }

  async signin({ username, password }: SigninDto) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({ sub: user.id, username });
    return { access_token: token };
  }
}