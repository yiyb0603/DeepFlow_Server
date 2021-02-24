import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import HttpError from "./HttpError";

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let customError: HttpError | any = {};
    console.log(exception);

    if (exception instanceof HttpError) {
      customError = {
        status: exception.statusCode,
        message: exception.message,
      };
    } 
    
    else {
      customError = {
        status: exception.getStatus() || 500,
        message: exception.getResponse() || '서버 오류입니다.',
      };
    }

    const { status, message } = customError;
    return response.status(status).json({
      status,
      message,
    })
  }
}