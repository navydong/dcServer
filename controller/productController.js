var moment = require('moment')
var dbhelp = require('../db')
var fs = require('fs')
var path = require('path')
module.exports = {
    retrieve: function (req, res) {
        var sql = 'SELECT * FROM product'
        console.log(req.signedCookies)
        dbhelp.query(sql, [], function (results, fields) {
            res.send({
                rows: results,
                tottal: results.length
            })
        })
    },
    create: function (req, res) {
        // 文件处理
        var file = req.files.book
        var des_file = path.join(__dirname, "../public/upload/" + file.originalFilename)
        fs.readFile(file.path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                if (err) throw err
                var path = des_file
                // 写入数据库
                dbhelp.query('SELECT categoryName FROM category WHERE id = ?', [req.body.categoryId], function (results, fields) {
                    const categoryName = results[0].categoryName



                    const data = { ...req.body,
                        categoryName,
                        productIcon: '/static/public/upload/" + file.originalFilename',
                        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                    const sql = 'INSERT INTO product set ?'
                    dbhelp.query(sql, data, function (results, fields) {
                        if (results.affectedRows == 1) {
                            res.send({
                                rel: true,
                                msg: '添加成功'
                            })
                        } else {
                            res.send({
                                res: false
                            })
                        }
                    })
                })
            })
        });




    },
    delete: function (req, res) {
        var sql = 'DELETE FROM product WHERE id = ?'
        var value = [req.params.id]
        dbhelp.query(sql, value, function (results, fields) {
            if (results.affectedRows == 1) {
                res.send({
                    rel: true,
                    msg: '删除成功'
                })
            } else {
                res.send({
                    res: false
                })
            }
        })
    },
    update: function (req, res) {
        var sql = 'UPDATE product SET categoryId=?, productName=?, productPrice=? H'
        // var arr = []
        // var value = []
        // for (var k in req.body) {
        //     if(k == 'id') continue
        //     arr.push(`${k} = ?`)
        //     value.push(req.body[k])
        // }
        // var arr2Str = arr.join(',')
        // sql = sql + arr2Str + ` WHERE id = ${req.body.id} `
        dbhelp.query(sql, [], function (results, fields) {
            if (results.affectedRows == 1) {
                res.send({
                    rel: true,
                    msg: '更新成功'
                })
            } else {
                res.send({
                    res: false
                })
            }
        })
    }
}