import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { UserLogons } from './auth.entity';
import { User } from '../user/user.entity';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { IToken } from './interfaces/token.interface';
import { ITokenData } from './interfaces/token-data.interface';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserLogons) private userLogonsRepository: Repository<UserLogons>,
              private userService: UserService) {}

  public async registration(email, password, userAgent): Promise<IAuthResponse> {
    password = await bcrypt.hash(password, 5);
    const user: User = await this.userService.create(email, password);
    const tokens = await this.generateTokens({ id: user.id });
    await this.saveToken(user.id, userAgent, tokens.refreshToken);

    return { user: { ...user }, ...tokens };
  }

  public async login(email, password, userAgent): Promise<IAuthResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        `User with email ${email} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(`Incorrect password`, HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.generateTokens({ id: user.id });
    await this.saveToken(user.id, userAgent, tokens.refreshToken);

    return { user: { ...user }, ...tokens };
  }

  public async logout(refreshToken): Promise<void> {
    if (refreshToken) {
      await this.userLogonsRepository.delete({ refreshToken });
    }
  }

  private async generateTokens(payload): Promise<IToken> {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refresh(refreshToken, userAgent): Promise<IAuthResponse> {
    if (!refreshToken) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const tokenData = this.validateToken(refreshToken, 'refreshToken');
    const isTokenExist = (await this.findRefreshToken(refreshToken)) != null;

    if (!tokenData || !isTokenExist) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const user: User = await this.userService.findById(tokenData.id);
    const tokens = await this.generateTokens({ id: user.id });
    await this.saveToken(user.id, userAgent, tokens.refreshToken);

    return { user: { ...user }, ...tokens };
  }

  private async saveToken(userId, userAgent, refreshToken): Promise<void> {
    const userLogon = await this.userLogonsRepository.findOne({
      where: { user: userId, userAgent },
    });

    if (userLogon) {
      userLogon.refreshToken = refreshToken;
      await this.userLogonsRepository.save(userLogon);
      return;
    }
    this.userLogonsRepository.save({
      user: userId,
      userAgent,
      refreshToken,
    });
  }

  public validateToken(token, tokenType): ITokenData | null {
    let secret;
    if (tokenType === 'accessToken') {
      secret = process.env.JWT_ACCESS_SECRET;
    } else if (tokenType === 'refreshToken') {
      secret = process.env.JWT_REFRESH_SECRET;
    }

    try {
      return <ITokenData>jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
  }

  private async findRefreshToken(refreshToken): Promise<UserLogons> {
    const token = await this.userLogonsRepository.findOne({
      where: { refreshToken },
    });
    return token;
  }
}
