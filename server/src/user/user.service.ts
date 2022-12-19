import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  public async findByEmail(email): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  public async create(email: string, password: string): Promise<User> {
    const candidate = await this.findByEmail(email);

    if (candidate) {
      throw new HttpException(
        `User with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.save({
      email,
      password,
    });

    return user;
  }

  public async findAll(): Promise<Array<User>> {
    const users = await this.userRepository.find();
    return users;
  }

  public async findById(id: number): Promise<User> {
    const users = await this.userRepository.findOne({ where: { id } });
    return users;
  }
}
