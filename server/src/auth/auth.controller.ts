import { Controller, Post, Delete, Req, Body, Res } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IAuthResponse } from './interfaces/auth-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async registration(@Req() request: Request,
                     @Res({ passthrough: true }) response: Response,
                     @Body() createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const { email, password } = createUserDto;
    const userAgent = request.get('User-Agent');
    const authResponseData = await this.authService.registration(
      email,
      password,
      userAgent,
    );
    response.cookie('refreshToken', authResponseData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return authResponseData;
  }

  @Post('/login')
  async login(@Req() request: Request,
              @Res({ passthrough: true }) response: Response,
              @Body() loginDto: CreateUserDto): Promise<IAuthResponse> {
    const { email, password } = loginDto;
    const userAgent = request.get('User-Agent');
    const authResponseData = await this.authService.login(
      email,
      password,
      userAgent,
    );
    response.cookie('refreshToken', authResponseData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return authResponseData;
  }
  @Delete('/logout')
  async logout(@Req() request: Request,
               @Res({ passthrough: true }) response: Response): Promise<void> {
    const { refreshToken } = request.cookies;
    await this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');
  }

  @Post('/refresh')
  async refresh(@Req() request: Request,
                @Res({ passthrough: true }) response: Response): Promise<IAuthResponse> {
    const { refreshToken } = request.cookies;
    const userAgent = request.get('User-Agent');
    const authResponse = await this.authService.refresh(
      refreshToken,
      userAgent,
    );
    response.cookie('refreshToken', authResponse.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return authResponse;
  }
}
