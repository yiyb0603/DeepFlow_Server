import { CanActivate, ExecutionContext } from "@nestjs/common";
import HttpError from "exception/HttpError";
import { verifyToken } from "lib/token";

export default class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { access_token } = request.headers;

    if (access_token === undefined) {
      throw new HttpError(401, '토큰이 전송되지 않았습니다.');
    }
    
    request.user = this.validateToken(access_token);
    return true;
  }

  public validateToken(token: string): string {
    try {
      const verify: string = verifyToken(token) as string;
      return verify;
    } catch (error) {
      switch (error.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpError(401, '유효하지 않은 토큰입니다.');

        case 'EXPIRED_TOKEN':
          throw new HttpError(410, '토큰이 만료되었습니다.');
        
        default:
          throw new HttpError(500, '서버 오류입니다.');
      }
    }
  }
}