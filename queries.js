const pgp = require('pg-promise')(/* options */)
const connectionString = 'postgres://localhost:5432/resty'
const db = pgp(connectionString)

// add query functions

const getAllUsers = (req, res, next) => {
  db.any('select * from users')
  .then(data => {
    console.log(data)
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved all users'
    })
  })
  .catch(err => {
    console.log(err)
    return next(err)
  })
}

module.exports = {
  getAllUsers: getAllUsers
  // getSingleUser: getSingleUser,
  // createUser: createUser
}