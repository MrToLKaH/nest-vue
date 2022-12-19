import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Req() request: Request,
               @Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get('/')
  async findAll(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Req() request: Request,
                 @Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findById(id);
  }
}
