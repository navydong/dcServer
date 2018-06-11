var dbhelp = require('../db')
module.exports = {
    retrieve: function (req, res) {
        var sql = 'INSERT INTO users set ?'
        var data = {
            user_name: req.query.name,
            password: req.query.password
        }
        dbhelp.query(sql, data, function (results, fields) {
            console.log(results)
            res.cookie('SESSION', req.query.name, {
                signed: true
            })
            res.send(results)
        })

    }
}