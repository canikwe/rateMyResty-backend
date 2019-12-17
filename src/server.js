const express = require('express')
const app = express()
const port = 3000

const db = require('../queries.js')

app.get('/', (req, res) => {
  res.send({
    msg: 'Hello World'
  })
})

app.get('/api/users', db.getAllUsers)
app.get('/api/users/:id', db.getSingleUser)

app.listen(port, () => console.log(`Listening on port ${port}`))
