if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: `${process.env.BUILD_WORKSPACE_DIRECTORY}/.env` ?? undefined,
  })
}
import * as express from 'express'

import { apiRoutes } from './api'

const port = process.env.PORT || 5000
const app = express()

app.use(express.urlencoded({ extended: true, inflate: false }))
app.use(express.json())
app.use(express.raw())

app.use('/', apiRoutes)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
