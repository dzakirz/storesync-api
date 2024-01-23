import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { SignupUserDto } from './dtos/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signup(user: SignupUserDto) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { username: user.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return await this.databaseService.user.create({
      data: {
        username: user.username,
        password: hashedPassword,
        image: 'default',
      },
      select: {
        username: true,
      },
    });
  }

  async signin(user: User) {
    const payload = {
      username: user.username,
      sub: {
        username: user.username,
        storeId: user.StoreId,
      },
    };

    const { id, password, createdAt, updatedAt, ...result } = user;

    return {
      ...result,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
      sub: {
        username: user.username,
        storeId: user.StoreId,
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
