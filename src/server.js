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

app.listen(port, () => console.log(`Listening on port ${port}`))
