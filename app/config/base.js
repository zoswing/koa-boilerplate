'use strict';

import compose from 'koa-compose';
import cors from 'kcors';
import Serve from 'koa-static';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import passport from 'koa-passport';

export default function middleware(app) {

    app.proxy = true;
    app.use(cors({ credentials: true }));
    app.use(bodyParser())
    app.use(mount("/", convert(Serve(__dirname + '/../public/'))));

    app.keys = ['superalsrk-session-key'];

    app.use(passport.initialize())
}