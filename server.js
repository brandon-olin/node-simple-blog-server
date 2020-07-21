const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routers/article')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

// Database
mongoose
  .connect('mongodb://127.0.0.1:27017/simple-blog-db', {
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
