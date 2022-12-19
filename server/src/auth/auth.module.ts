import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogons } from './auth.entity';
import { User } from '../user/user.entity';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogons, User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
