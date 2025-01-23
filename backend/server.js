const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
const connection = require('./db/connection.js')
app.use(require('./routes/route'))

connection.then(db=>{
    if(!db){return process.exit(1)}
    app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})
    app.on('error',(error)=>console.log(error))
}).catch((error)=>{console.log(error)})

