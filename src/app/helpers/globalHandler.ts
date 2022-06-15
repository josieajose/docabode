import * as Hapi from "@hapi/hapi";
import {
  BusinessException,
  NotFoundException,
} from "../../domain/entities/exceptions";

export function globalHandler(
  controller: Function,
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  try {
    return controller(request, h);
  } catch (error) {
    if (error instanceof NotFoundException) {
      return h
        .response({
          success: false,
          message: error.message,
        })
        .code(404);
    }
    if (error instanceof BusinessException) {
      return h
        .response({
          success: false,
          message: error.message,
        })
        .code(400);
    }

    return h
      .response({
        success: false,
        message: "An exception raised! Please try again later.",
      })
      .code(500);
  }
}
