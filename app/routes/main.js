'use strict';

import Router from 'koa-router';
import MainController from '../controller/MainController'
const router = new Router();

router.get('/user', MainController.getUser)

router.get('/app', async(ctx, next) => {
    ctx.body = {
        "status": "app"
    }
})
router.get('/aa', async(ctx, next) => {
    ctx.body = {
        "name": "hm"
    }
})


export default router;