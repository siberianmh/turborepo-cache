import * as express from 'express'
import { getStore } from '../lib/cache'

const store = getStore('s3')

export const getFile = async (req: express.Request, res: express.Response) => {
  const { hash } = req.params

  const key = `cas/${hash}`
  const file = await store.getFile(key)

  if (!file) {
    return res.sendStatus(404)
  }

  return res.send(file)
}

export const putFile = async (req: express.Request, res: express.Response) => {
  const { hash } = req.params
  console.log('HEADERS', req.headers)

  const key = `cas/${hash}`
  await store.putFile(key, req.body)

  return res.sendStatus(200)
}
