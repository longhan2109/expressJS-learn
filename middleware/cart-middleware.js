var db = require("../db");

module.exports = function(req, res, next) {
  if (req.signedCookies.sessionId) {
    var session = db
      .get("sessions")
      .find({ id: req.signedCookies.sessionId })
      .value();
    res.locals.session = session;

    if(session.cart){
        var inCart = Object.values(session.cart).reduce(function(accumulator, currentIndex){
            return accumulator + currentIndex
        })

        db.get("sessions")
        .find({ id: session.id })
        .set("inCart", inCart)
        .write();
    }
    

    // console.log(session);
  }

  next();
};
