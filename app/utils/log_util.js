/**
 * 日志工具类，封装、格式化服务端错误、响应以及请求的日志
 */
var log4js = require('log4js');
var fs = require('fs');
var logConfig = require('../config/log_config');

/**
 * 当前目录不存在log文件夹和相关文件时候自动生成目录以及文件
 * 
 * @class genLogFiles
 */
class genLogFiles {
    /**
     * 确定目录是否存在，如果不存在则创建目录
     */
    confirmPath(pathStr) {
            if (!fs.existsSync(pathStr)) {
                fs.mkdirSync(pathStr);
                console.log('createPath: ' + pathStr);
            }
        }
        /**
         * 初始化log相关目录
         */
    initLogPath() {
        //创建log的根目录'logs'
        if (logConfig.baseLogPath) {
            this.confirmPath(logConfig.baseLogPath)
                //根据不同的logType创建不同的文件目录
            for (var i = 0, len = logConfig.appenders.length; i < len; i++) {
                if (logConfig.appenders[i].path) {
                    this.confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path);
                }
            }
        }
    }
}
/**
 * 日志类，封装错误、请求、响应日志已经日志格式
 * 
 * @class LogUtil
 */
class LogUtil {
    constructor() {
        var genLog = new genLogFiles();
        genLog.initLogPath();
        //加载配置文件
        log4js.configure(logConfig);
        this.errorLogger = log4js.getLogger('errorLogger');
        this.resLogger = log4js.getLogger('resLogger');
    }

    //封装响应日志
    logResponse(ctx, resTime) {
            if (ctx) {
                this.resLogger.info(this.formatRes(ctx, resTime));
            }
        }
        //封装错误日志
    logError(ctx, error, resTime) {
            if (ctx && error) {
                this.errorLogger.error(this.formatError(ctx, error, resTime));
            }
        }
        //格式化响应日志
    formatRes(ctx, resTime) {
        var logText = new String();
        //响应日志开始
        logText += "\n" + "*************** response log start ***************" + "\n";
        //添加请求日志
        logText += this.formatReqLog(ctx.request, resTime);
        //响应状态码
        logText += "response status: " + ctx.status + "\n";
        //响应内容
        logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";
        //响应日志结束
        logText += "*************** response log end ***************" + "\n";
        return logText;
    }

    //格式化错误日志
    formatError(ctx, err, resTime) {
            var logText = new String();
            //错误信息开始
            logText += "\n" + "*************** error log start ***************" + "\n";
            //添加请求日志
            logText += this.formatReqLog(ctx.request, resTime);
            //错误名称
            logText += "err name: " + err.name + "\n";
            //错误信息
            logText += "err message: " + err.message + "\n";
            //错误详情
            logText += "err stack: " + err.stack + "\n";

            //错误信息结束
            logText += "*************** error log end ***************" + "\n";

            return logText;
        }
        //格式化请求日志
    formatReqLog(req, resTime) {

        var logText = new String();

        var method = req.method;
        //访问方法
        logText += "request method: " + method + "\n";

        //请求原始地址
        logText += "request originalUrl:  " + req.originalUrl + "\n";

        //客户端ip
        logText += "request client ip:  " + req.ip + "\n";

        //开始时间
        var startTime;
        //请求参数
        if (method === 'GET') {
            logText += "request query:  " + JSON.stringify(req.query) + "\n";
            // startTime = req.query.requestStartTime;
        } else {
            logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
            // startTime = req.body.requestStartTime;
        }
        //服务器响应时间
        logText += "response time: " + resTime + "\n";

        return logText;
    }
}
export default new LogUtil();