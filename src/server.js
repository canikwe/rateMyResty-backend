const express = require('express')
const app = express()
const port = 3000

const db = require('../queries.js')

// Apply express json parser to parse body from POST requests
app.use(express.json())

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello World'
  })
})

app.get('/api/users', db.getAllUsers)
app.get('/api/users/:id', db.getSingleUser)
app.post('/api/users', db.createUser)
app.patch('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

// Development error handling
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    })
  })
}

// Production error handling
app.use((err, req, res, next) => {
  res.status( err.status || 500 )
  .json({
    status: 'error',
    message: err.message
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
