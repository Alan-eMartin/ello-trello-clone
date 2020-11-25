const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user-routers')
const listRouter = require('./routers/list-router')

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())

app.use(userRouter)
app.use(listRouter)

app.listen(port, () => {
  console.log(`Server is currently running on http://localhost:${port}`);
})