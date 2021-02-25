import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import HttpError from "./HttpError";

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let httpError: HttpError | any = {};
    console.log(exception);

    if (exception instanceof HttpError) {
      httpError = {
        status: exception.statusCode,
        message: exception.message,
      };
    } 
    
    else {
      httpError = {
        status: (exception && exception.getStatus()) || 500,
        message: (exception && exception.message) || '서버 오류입니다.',
      };
    }

    const { status, message } = httpError;
    return response.status(status).json({
      status,
      message,
    })
  }
}