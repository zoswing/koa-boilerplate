"use strict";
const path = require("path");
const _ = require("lodash");

let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

let base = {
    app: {
        root: path.normalize(path.join(__dirname, "/..")),
        env: env,
    },
};

let specific = {
    development: {
        app: {
            port: 5000,
            name: "koa2-boilerplate - Dev",
            excluded: "excluded_path"
        },
        mysql: {
            host: '192.9.210.86',
            port: 3306,
            user: 'root',
            password: 'root123456',
            database: 'acms'
        }
    },
    production: {
        app: {
            port: process.env.PORT || 5000,
            name: "koa2-boilerplate",
            excluded: "excluded_path"
        },
        mysql: {
            host: '192.9.210.86',
            port: 3306,
            user: 'root',
            password: 'root123456',
            database: 'acms'
        }
    },
};

module.exports = _.merge(base, specific[env]);