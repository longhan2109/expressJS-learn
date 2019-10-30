require('dotenv').config()

const express = require('express')
const app = express()

const port = 2341

// post
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// user route
const userRoute = require('./router/user-router')
const authRoute = require('./router/auth-route')
const productRoute = require('./router/product-route')

const authMiddleware = require('./middleware/auth-middleware')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('index', {
        name: 'Long'
    })
})

app.use('/users',authMiddleware.requireAuth, userRoute)
app.use('/products', productRoute)
app.use('/auth', authRoute)

app.listen(port, function(){
    console.log('Server listen on port ' + port);
}
)