var dbhelp = require('../db')
module.exports = {
    retrieve: function (req, res) {
        var sql = 'SELECT * FROM category'
        dbhelp.query(sql, [], function (results, fields) {
            var data = {}
            results.forEach(item => {
                data[item.id] = item.categoryName
            });
            res.send(data)
        })
    }
}