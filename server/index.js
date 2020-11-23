const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user-routers')

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())

app.use(userRouter)

app.get('/hello', async (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`Server is currently running on http://localhost:${port}`);
})