import * as express from 'express'

import { index } from './meta'
import { getFile, putFile } from './cache'

const router = express.Router()

router.get('/', index)
router.get('/?', index)

// Cache
router.get('/v8/artifacts/:hash', getFile)
router.put('/v8/artifacts/:hash', putFile)

export const apiRoutes = router
