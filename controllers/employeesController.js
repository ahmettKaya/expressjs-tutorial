const data = {}
data.employees = require('../model/employees.json')

getAllEmployees = (req, res) => {
    res.json(data.employees)
}

createNewEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    })
}

getEmployee = (req, res) => {
    res.json({
        "id": req.params.id
    })
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}