/*
 * @Author: yss.donghaijun 
 * @Date: 2018-05-21 13:40:53 
 * @Last Modified by: yss.donghaijun
 * @Last Modified time: 2018-05-21 16:27:35
 */

var mysql = require('mysql')
var config = require('./config')

/**
 * 
 * 
 * @param {string} sql - sql语句，变量用？表示
 * @param {arrary} [params] - sql变量
 * @param {queryCallback} callback - 回调函数
 */
function query(sql, params, callback) {
    var connection = mysql.createConnection(config);
    // 连接
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        console.log('数据库连接')
    })
    connection.query(sql, params, function (err, results, fields) {
        if (err) {
            console.log('数据操作失败');
            throw err;
        }
        callback && callback(results, fields);
        connection.end(function (err) {
            if (err) {
                console.log('关闭数据库连接失败！');
                throw err;
            }
        });
    })



}
/**
 * This callback is displayed as a global member.
 * @callback queryCallback
 * @param {object} err - 错误或者null
 * @param {object} [reuslts] - 结果
 * @param {array} [fields] - 数据库字段
 */

exports.query = query