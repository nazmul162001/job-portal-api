const express = require('express');
const PORT = process.env.PORT || 5000
const colors = require('colors');
const dotenv = require('dotenv');
const app = express()

const userRoute = require("./Routes/user.route")
const adminRoute = require("./Routes/admin.route")
const generalRoute = require("./Routes/general.route")
const candidateRoute = require("./Routes/candidate.route")
const hiringManagerRoute = require("./Routes/hiringManager.route")

dotenv.config()
app.use(express.json())

// Routes
app.use('/api/', generalRoute)
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/', candidateRoute)
app.use('/api/', hiringManagerRoute)

// Database Connect
require('./Config/dbConfig')

// Health Check
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`.bold.red);
})