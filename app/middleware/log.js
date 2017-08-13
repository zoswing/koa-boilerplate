import log_Util from '../utils/log_util';
export default function logUtil() {
    return async function(ctx, next) {
        //响应开始时间
        const start = new Date();
        //响应间隔时间
        var ms;
        try {
            //开始进入到下一个中间件
            await next();

            ms = new Date() - start;
            //记录响应日志
            log_Util.logResponse(ctx, ms);

        } catch (error) {

            ms = new Date() - start;
            //记录异常日志
            log_Util.logError(ctx, error, ms);
        }
    }
}