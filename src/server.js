import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db'
import dataRouter from './resource/router'

export const app = express()
const port = 5050

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', dataRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log('Api server is running at port 5050 ')
    })
  } catch (e) {
    console.error(e)
  }
}
