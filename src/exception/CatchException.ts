import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let httpError = null;

    if (exception instanceof HttpException) {
      httpError = {
        status: exception.getStatus(),
        message: exception.message,
      };
    } 
    
    else {
      httpError = {
        status: 500,
        message: '서버 오류입니다.',
      };
    }

    const { status, message } = httpError;
    return response.status(status).json({
      status,
      message,
    });
  }
}