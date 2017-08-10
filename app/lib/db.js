'use strict';

import mysql from 'mysql';

const db = {}

const mysqlPool = mysql.createPool({
    connectionLimit: 10,
    host: '192.9.210.86',
    user: 'root',
    port: 3306,
    password: 'root123456',
    database: 'acms'
});

db.pool = mysqlPool;

db.query = async function(sql, value) {
    return new Promise((resolve, reject) => {
        mysqlPool.query(sql, value, function(err, results, fields) {
            if (err) {
                reject(Error(err))
            } else {
                resolve(results)
            }
        })
    })
}

db.queryAsync = function(sql, value, cb) {
    mysqlPool.query(sql, value, function(err, results, fields) {
        cb(err, results, fields)
    })
}

export default db;