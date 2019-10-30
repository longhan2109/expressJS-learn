var db = require('../db')

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1 // n
    var perPage = 8; // x
    var start = (page - 1) * perPage
    var end = page * perPage

    res.render('products', {
        products: db.get('products').value().slice(start, end)
    })
}

module.exports.search = function(req, res) {
    var products = db.get('products').value()

    var pd = req.query.product
    var matchedProduct = products.filter(function(product) {
        return product.name.indexOf(pd) !== -1
    })

    res.render('products/index', {
        products : matchedProduct
    })
}