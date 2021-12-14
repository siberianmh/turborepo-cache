import * as express from 'express'

import { apiRoutes } from './api'

const port = process.env.PORT || 5000
const app = express()

app.use(express.urlencoded({ extended: true, inflate: false }))
app.use(express.json())
app.use(express.raw({ limit: '100mb' }))

app.use('/', apiRoutes)

const argv = process.argv.slice(2)
console.log(argv)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
