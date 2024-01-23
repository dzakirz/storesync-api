import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { RefreshtJwtAuthStrategy } from './strategies/refresh-jwt-auth.strategy';

@Module({
  providers: [
    AuthService,
    DatabaseService,
    LocalAuthStrategy,
    JwtAuthStrategy,
    RefreshtJwtAuthStrategy,
  ],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
  ],
})
export class AuthModule {}
