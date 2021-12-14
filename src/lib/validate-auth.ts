import * as express from 'express'
import { config } from './config'

export const validateAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.method === 'GET' && config.auth.allow_unauthenticated_reads) {
    return next()
  }

  const authorization = req.headers['authorization']

  if (!authorization || authorization === '') {
    return res.status(403).json({
      message: 'Bad credentials',
      status: 403,
    })
  }

  const [prefix, token] = authorization.split(' ')

  if (!token) {
    return res.status(403).json({
      message: 'Bad credentials',
      status: 403,
    })
  }

  if (prefix.toLowerCase() !== 'bearer') {
    return res.status(403).json({
      message: 'Bad credentials',
      status: 403,
    })
  }

  const valid = config.auth.tokens.includes(token)

  if (!valid) {
    return res.status(403).json({
      message: 'Bad credentials',
      status: 403,
    })
  }

  return next()
}
