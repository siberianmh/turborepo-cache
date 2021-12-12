import * as express from 'express'
import { getStore } from '../cache'
import { config } from '../config'

const store = getStore(config.s3 ? 's3' : 'local')

export class CacheController {
  public async getFile(req: express.Request, res: express.Response) {
    const { hash } = req.params

    const key = `cas/${hash}`
    const file = await store.getFile(key)

    if (!file) {
      return res.status(404).json({
        message: 'Not found',
        status: 404,
      })
    }

    return res.send(file)
  }

  public async putFile(req: express.Request, res: express.Response) {
    const { hash } = req.params

    const key = `cas/${hash}`
    await store.putFile(key, req.body)

    return res.sendStatus(204)
  }
}
