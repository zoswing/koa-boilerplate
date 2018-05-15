/**
 * 异常处理
 * @export
 * @returns
 */
import { CustomError, HttpError } from '../utils/error-msg/customError.js';
export default function exceptionHandler() {
  return async (ctx, next) => {
    return next().catch(err => {
      let code = 500;
      let msg = 'unknown error';
      if (err instanceof CustomError || err instanceof HttpError) {
        const res = err.getCodeMsg();
        ctx.status = err instanceof HttpError ? res.code : 200;
        ctx.resCode = res.code;
        ctx.resMsg = res.msg;
      } else {
        console.error('err', err);
      }
    });
  };
}
