const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const handleLogin = async (req, res) => {
    const { name, password } = req.body
    if(!name || !password) return res.status(400).json({"message": "Username and password required!"})
    const foundUser = usersDB.users.find(user => user.name === name)
    if(!foundUser) return res.sendStatus(401)
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        res.json({'success': `User ${name} is logged in.`})
    } else {
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}