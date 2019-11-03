require('dotenv').config()

const express = require('express')
const app = express()
const port = 2341

// post
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const csurf = require('csurf')

// user route
const userRoute = require('./router/user-router')
const authRoute = require('./router/auth-route')
const productRoute = require('./router/product-route')
const transferRoute = require('./router/transfer-route')
const cartRoute = require('./router/cart-route')

const authMiddleware = require('./middleware/auth-middleware')
const sessionMiddleware = require('./middleware/session-middleware')
const cartMiddleware = require('./middleware/cart-middleware')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware)
// app.use(cartMiddleware)
// app.use(csurf({ cookie : true}))


app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('index', {
        name: 'Long'
    })
})

app.use('/users',authMiddleware.requireAuth, userRoute)
app.use('/products',sessionMiddleware, cartMiddleware ,productRoute)
app.use('/auth', authRoute)
app.use('/transfer',authMiddleware.requireAuth ,transferRoute)
app.use('/cart', cartRoute)

app.listen(port, function(){
    console.log('Server listen on port ' + port);
}
)