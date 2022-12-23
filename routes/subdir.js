const express = require('express')
const path = require('path')

const router = express.Router()

const root = path.join(__dirname, "..", "views", "subdir")

router.get('/', (req, res) => {
    res.sendFile("index.html", {
        root: root
    })
})

router.get('/index(.html)?', (req, res) => {
    res.sendFile("index.html", {
        root: root
    })
})

router.get('/test(.html)?', (req, res) => {
    res.sendFile("test.html", {
        root: root
    })
})

module.exports = router