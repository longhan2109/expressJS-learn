var db = require('../db')

module.exports.index = function(req, res){
    res.render('users', {
        users : db.get('users').value()
    })
}

module.exports.search = function(req, res){
    var users = db.get('users').value()

    var q = req.query.q
    var matchedUsers = users.filter(function(user){
        return user.name.indexOf(q) !== -1
    }) 
    
    res.render('users/index', {
        users : matchedUsers
    })
}

module.exports.renderCreate = function(req, res){
    res.render('users/create')
}

module.exports.viewUser = function(req, res) {
    var id = req.params.id

    var user = db.get('users').find({id : id}).value()

    res.render('users/view', {
        user: user
    })
}

module.exports.createUser = function(req, res){
    
    req.body.id = shortid.generate()
    db.get('users')
        .push(req.body)
        .write()

    res.redirect('/users')
}