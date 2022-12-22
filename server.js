const express = require('express')
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const { errorHandler } = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3500
const app = express()

app.use(logger)

// Cross Origin Resource Sharing
const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://127.0.0.1:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS!'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile("index.html", {
        root: path.join(__dirname, "views")
    })
})

app.get('/index(.html)?', (req, res) => {
    res.sendFile("index.html", {
        root: path.join(__dirname, "views")
    })
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile("new-page.html", {
        root: path.join(__dirname, "views")
    })
})

app.get('/old-page(.html)?', (req, res) => {
    res.status(301).sendFile("new-page.html", {
        root: path.join(__dirname, "views")
    })
})

app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to send hello.html')
    next()
}, (req, res) => {
    res.send('Hello world!')
})

const firstChainFun = (req, res, next) => {
    console.log('First chain function.')
    next()
}

const secondChainFun = (req, res, next) => {
    console.log('Second chain function.')
    next()
}

const lastChainFun = (req, res) => {
    console.log('Last chain function.')
    res.send('Last chain!')
}

app.get('/chain', [firstChainFun, secondChainFun, lastChainFun])

app.all('*', (req, res) => {
    res.status(404)
    
    if (req.accepts('html')) {
        res.sendFile("404.html", {
            root: path.join(__dirname, "views")
        })
    } 
    else if(req.accepts('json')){
        res.send(app.json('404 Not Found'))
    }
    else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})