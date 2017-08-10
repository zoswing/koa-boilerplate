'use strict';
//import路由
import RouterMain from './main';
import Router from 'koa-router';
import compose from 'koa-compose';
//创建实例
const router = new Router();

//启用路由
router.use(RouterMain.routes(), RouterMain.allowedMethods())

export default function routes() {
    return compose(
        [
            router.routes(),
            router.allowedMethods()
        ]
    )
}