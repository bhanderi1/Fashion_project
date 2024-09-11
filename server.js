require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const port = process.env.PORT



app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.write('welcome to express server')
})

app.use('/api', require('./routes/users/index.routes'))
app.use('/api/admin', require('./routes/admin/index.routes'))


app.listen(port, () => {
    mongoose
       .connect(process.env.MONGO_URL)
       .then(()=>{
        console.log('Database Connection established sucess...');
       })
       .catch((err) => console.log(err))
    console.log(`server start at http://localhost:${port}`);
})