const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('HELLO WANKER'))  

app.get('/a', (req, res) => res.send('YOU a BIG OL WANKER'))  

app.listen(port, ()=> console.log(`example aoje on port ${port}`))




