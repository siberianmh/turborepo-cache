import * as express from 'express'

export const index = async (_req: express.Request, res: express.Response) => {
  return res.sendStatus(200).json({
    status: 200,
    message: 'turborepo cache server',
  })
}
