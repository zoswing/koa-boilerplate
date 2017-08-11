'use strict';

import compose from 'koa-compose';
import log from './log';
// import checkauth from './checkauth';

export default function middleware() {
    return compose(
        [
            // checkauth()
            log()
        ]
    )
}