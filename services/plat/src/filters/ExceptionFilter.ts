import {ArgumentsHost, Catch, HttpException, HttpStatus} from "@nestjs/common";
import {BaseExceptionFilter} from "@nestjs/core";
import {Response} from "express";

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    return host
      .switchToHttp()
      .getResponse<Response>()
      .status(this.toStatusCode(exception))
      .json(this.toResponse(exception));
  }

  private toStatusCode(exception: unknown): HttpStatus {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private toResponse(exception: Error): object {
    return exception instanceof HttpException
      ? this.fromHttpException(exception)
      : this.fromError(exception);
  }

  private fromHttpException(exception: HttpException): object {
    const {name} = exception;
    return {
      statusCode: exception.getStatus(),
      message: exception["response"]["message"],
      name: exception["response"]["error"] ?? name,
    };
  }

  private fromError(exception: Error): object {
    const {message, name} = exception;
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      name,
    };
  }
}
