const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routers/article')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT

// Database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routers
app.use(articleRouter)
app.use(userRouter)

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`))
