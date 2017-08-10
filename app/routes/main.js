'use strict';

import Router from 'koa-router';

const router = new Router();

router.get('/', async(ctx, next) => {
    ctx.body = {
        "status1": "home",
        "status2": "app"
    }
})

router.get('/app', async(ctx, next) => {
    ctx.body = {
        "status": "app"
    }
})


export default router;