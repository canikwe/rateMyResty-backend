const express = require('express')
const app = express()
const port = 3000

const fetch = require('node-fetch')
const bluebird = require('bluebird')
fetch.promise = bluebird

// Database queries
const db = require('../queries.js')

// Configure dotenv for environment variables
const dotenv = require('dotenv')
dotenv.config()

// Apply express json parser to parse body from POST requests
app.use(express.json())

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello World'
  })
})

// Yelp calls
app.get('/yelp/:term/:location', (req, res) => {
  fetch(`https://api.yelp.com/v3/businesses/search?term=${req.params.term}&location=${req.params.location}&limit=10`, {
    headers: {
      Authorization: `Bearer ${process.env.api_key}`
    }
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data.businesses)
    res.send(data.businesses)
  })
  .catch(err => {
    console.log(err)
    return res.send(err)
  })
})

// Database queries
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
