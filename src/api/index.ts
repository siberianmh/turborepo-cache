import * as express from 'express'

import { index } from './meta'
import { getFile, putFile } from './cache'
import { validateAuth } from '../lib/validate-auth'

const router = express.Router()

router.get('/', index)
router.get('/?', index)

// Cache
router.get('/v8/artifacts/:hash', validateAuth, getFile)
router.put('/v8/artifacts/:hash', validateAuth, putFile)

export const apiRoutes = router
