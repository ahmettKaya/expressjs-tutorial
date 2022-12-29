const whiteList = [
    'https://www.yoursite.com', 
    'http://127.0.0.1:5500', 
    'http://127.0.0.1:3500'
]

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

module.exports = corsOptions