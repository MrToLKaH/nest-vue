import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ITokenData } from '../interfaces/token-data.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return false;
    }

    const tokenData: ITokenData = this.authService.validateToken(
      accessToken,
      'accessToken',
    );

    if (!tokenData) {
      return false;
    }

    response.user = tokenData;
    return true;
  }
}
