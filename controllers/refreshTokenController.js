const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    console.log(refreshToken)
    const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.name !== decoded.name) return res.sendStatus(403)
            const accesToken = jwt.sign(
                {"name": foundUser.name},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1m'}
            )
            res.json({accesToken})
        }
    )
}

module.exports = {handleRefreshToken}