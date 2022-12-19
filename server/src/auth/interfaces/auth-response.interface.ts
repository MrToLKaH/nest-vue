import { IUserResponse } from '../../user/dto/user-response.interface';
import { IToken } from './token.interface';

export interface IAuthResponse extends IUserResponse, IToken {}
