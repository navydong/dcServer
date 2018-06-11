var express = require('express')
var router = express.Router()
var dbhelp = require('../db')

router.get('/menu/system', function (req, res) {
    var sql = 'SELECT * FROM menu'
    dbhelp.query(sql, [], function (results, fields) {
        results.forEach(item=>{
            item.children = []
        })
        res.send(results)
    })
})
router.get('/user', function (req, res) {
    res.send({
        crtTime: "2018-05-18 11:11:28",
        crtUser: "46b2c42002804d38a75e56536e24c389",
        deleted: 0,
        id: "7583efdcbf5c4309b39eaab541300989",
        isInit: false,
        orgLevel: "3",
        orgType: "2",
        password: "$2a$12$vNLDW6KA3jrSNCTlPu3/KeStDcTnEeEVTZQsyfTwwvLrmoSl3ap8y",
        username: "zhbsh"
    })
})


module.exports = router