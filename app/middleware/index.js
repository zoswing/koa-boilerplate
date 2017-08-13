'use strict';

import compose from 'koa-compose';
import log from './log';
import ResFormat from './response-formatter';
// import checkauth from './checkauth';

export default function middleware() {
    return compose(
        [
            // checkauth()
            log(),
            ResFormat()
        ]
    )
}