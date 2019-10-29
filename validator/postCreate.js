module.exports.postCreate = function(req, res, next){
    var name = req.body.name
    var phone = req.body.phone
    var errors = []

    if (!name){
        errors.push('Name is required')
    }
    if (!phone){
        errors.push('Phone is required')
    }
    if(errors.length){
        res.render('users/create', {
            errors : errors,
            values : req.body
        })
        return
    }
    next()
}