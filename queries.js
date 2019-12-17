const pgp = require('pg-promise')(/* options */)
const connectionString = 'postgres://localhost:5432/resty'
const db = pgp(connectionString)

// add query functions

const getAllUsers = (req, res, next) => {
  db.any('SELECT * FROM users')
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

const getSingleUser = (req, res, next) => {
  const userId = req.params.id
  db.one('SELECT * FROM users WHERE id =$1', userId)
  .then(data => {
    console.log(data)
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retreived ONE user'
    })
  })
  .catch(err => {
    console.log(err)
    return next(err)
  })
}

const createUser = (req, res, next) => {
  console.log(req.body)
  db.one('INSERT INTO users (name)' + 
  'VALUES (${name})' + 
  'RETURNING *', 
  req.body)
  .then(data => {
    console.log(data)

    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Created new user'
    })
  })
  .catch(err => {
    console.log(err)
    console.log(req.body)
    return next(err)
  })
}

const updateUser = (req, res, next) => {
  const columns = Object.keys(req.body)
  const values = Object.values(req.body)
  const query = columns.map((c, i) => `${c}=$${i + 1}`).join(', ')

  db.one(`UPDATE users SET ${query}, updated_at=current_timestamp WHERE id=${req.params.id} RETURNING *`, values)
  .then(data => {
    console.log(data)

    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Updated user'
    })
  })
  .catch(err => {
    console.log(err)
    return next(err)
  })
}


module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser
}