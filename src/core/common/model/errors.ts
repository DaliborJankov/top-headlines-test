import { AjaxError } from "rxjs/ajax";

export interface ServerErrorResponse extends AjaxError {
  response: {
    errors: {};
  };
}

export function isAjaxErrorOnly(error: any): error is AjaxError {
  return error instanceof AjaxError && !isServerErrorResponse(error);
}

export function isServerErrorResponse(
  error: any
): error is ServerErrorResponse {
  return (
    error instanceof AjaxError &&
    error.response instanceof Object &&
    error.response.errors instanceof Object
  );
}
