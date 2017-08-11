'use strict';

import Router from 'koa-router';
import MainController from '../controller/MainController'
const router = new Router();

router.get('/', MainController.getUser)

router.get('/app', async(ctx, next) => {
    ctx.body = {
        "status": "app"
    }
})


export default router;