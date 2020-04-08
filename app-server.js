const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('HELLO YOU'))  

app.get('/a', (req, res) => res.send('You at a'))  

app.listen(port, ()=> console.log(`example aoje on port ${port}`))


