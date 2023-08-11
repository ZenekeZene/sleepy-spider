// const debug = require('debug')('vocabulary-book-database:server')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')

dotenv.config()

console.log('Environment:', process.env.NODE_ENV)
const routes = require('./src/router')

const port = process.env.PORT
const prefix = process.env.PREFIX
const version = process.env.VERSION
const environment = process.env.NODE_ENV
const baseURL = `/${prefix}/${version}`

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use(`${baseURL}`, routes)

const JSON_SPACES = environment === 'production' ? 0 : 2
app.set('json spaces', JSON_SPACES)

app.listen(port, () => {
  console.log(`Sleepy back running on port ${port}`)
})
