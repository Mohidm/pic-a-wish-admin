const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")
const mongoose = require("mongoose")
const config = require('./config/db')
// MongoDB Connection
mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected',()=>{
    console.log("Connected to DB",config.database)
})
mongoose.connection.on('error',(error)=>{
    console.log("DB Error "+error)
})


const app = express()
const port = 3000
const admin = require('./routes/admin')
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)
app.use('/admin',admin)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})