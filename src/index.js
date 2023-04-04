const dotenv = require('dotenv')
const express = require('express')
const cors =  require('cors')
const paginate = require('express-paginate')
const router = require('./routes/index')
const { errorLogger, errorResponder } = require('./middlewares/errorsHandler')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(paginate.middleware(10, 50))
app.use(router)
app.use(errorLogger)
app.use(errorResponder)

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
dotenv.config()