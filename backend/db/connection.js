const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.MONGO_URI).then((db)=>{console.log("Database Connected!")
return db;
}).catch((error)=>{console.log(error)})

module.exports = connection;